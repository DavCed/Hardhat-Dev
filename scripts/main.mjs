import ethers from "hardhat";
import { runIPFSNetwork, ipfsNode, addFileToIPFS } from "./ipfs.mjs";

export let contract = null;
let contractFactory = null;
export let transactionResponse = null;
const ethersObj = ethers.ethers;

async function main() {
  contractFactory = await loadContract("DistributedStorage");
  await deployContract();
  const data = await runIPFSNetwork('test.txt','testdata');
  const cid = await addFileToIPFS(data);
  const url = `http://ipfs.io/ipfs/${cid}/`;
  ipfsNode.stop();
  const transactionResponse = await storeOnChain(cid,url);
  console.log(`Transaction hash: ${transactionResponse.hash}`);
  const content = await getFromChain(cid);
  console.log(`File reads: ${content}`);
}

export async function loadContract(contractName) {
  contractFactory = await ethersObj.getContractFactory(contractName);
  return contractFactory;
}

export async function deployContract() {
  contract = await contractFactory.deploy();
  await contract.deploymentTransaction().wait(4);
  const address = (await contract.getAddress()).toString();
  console.log(`Contract Address: ${address}`);
  console.log("*****************************************************************");
}

export async function storeOnChain(cid,url) {
  transactionResponse = await contract.storeFile(cid, url);
  await transactionResponse.wait(1);
  return transactionResponse;
}

export async function getFromChain(cid) {
  let content = null;
  if(cid === 'testing') content = await contract.getFile(cid); 
  const endpt = await contract.getFile(cid);
  const response = await fetch(endpt);
  content = await response.text();
  return content;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
