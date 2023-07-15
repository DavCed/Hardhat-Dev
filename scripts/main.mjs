import hre from "hardhat";
import {
  runIPFSNetwork,
  stopIPFSNetwork,
  addFileToIPFS,
  getFileFromIPFS,
} from "./ipfs.mjs";
import student from "../student.json" assert { type: "json" };

export let contract = null;

async function main() {
  // Deploy contract
  await deployContract();
  console.log(
    "*****************************************************************"
  );

  // Start running IPFS network
  await runIPFSNetwork();

  // Add converted json file to IPFS
  const studentJSON = JSON.stringify(student);
  const cidStudent = (await addFileToIPFS(studentJSON)).toString();
  const urlStudent = `http://ipfs.io/ipfs/${cidStudent}/`;

  // Add to IPFS
  const cidText = (await addFileToIPFS("Hello World!")).toString();
  const urlText = `http://ipfs.io/ipfs/${cidText}/`;

  // Stop running IPFS network
  await stopIPFSNetwork();
  console.log(
    "*****************************************************************"
  );

  // Store cid and url with contract
  await storeOnChain(cidStudent, urlStudent);
  await storeOnChain(cidText, urlText);
  console.log(
    "*****************************************************************"
  );

  // Get data from IPFS for json file
  const contentStudent = JSON.parse(await getFileFromIPFS(cidStudent));
  console.log(contentStudent);
  console.log(`Name: ${contentStudent.name}`);
  console.log(`Age: ${contentStudent.age}`);
  console.log(`GPA: ${contentStudent.gpa}`);
  console.log(`Grade: ${contentStudent.grade}`);
  console.log(
    "*****************************************************************"
  );

  // Get data from IPFS for text file
  const contentText = await getFromChain(cidText);
  console.log(`Text: ${contentText}`);
  console.log(
    "*****************************************************************"
  );

  // Get all data from IPFS
  await getAllFromChain();
}

export async function deployContract() {
  // Get contract details from ethers factory
  const contractFactory = await hre.ethers.getContractFactory(
    "DistributedStorage"
  );

  // Deploy contract on chain
  contract = await contractFactory.deploy();
  await contract.deploymentTransaction().wait(4);

  // Get contract address
  const address = (await contract.getAddress()).toString();
  console.log(`Contract Address (Distributed Storage): ${address}`);
}

export async function storeOnChain(cid, url) {
  // Store file on blockchain
  const transactionResponse = await contract.storeFile(cid, url);
  await transactionResponse.wait(1);
  console.log(`Transaction hash (storeFile): ${transactionResponse.hash}`);
}

export async function getFromChain(cid) {
  // Testing purposes ***NEEDS CHANGE***
  if (cid === "testing") return await contract.getFile(cid);

  // Get file from blockchain
  const endpt = await contract.getFile(cid);
  const response = await (await fetch(endpt)).text();
  return response;
}

export async function getAllFromChain() {
  // Get all files from blockchain
  const allFiles = await contract.getAllFiles();
  for (let i = 0; i < allFiles.length; i++) {
    console.log(`File ${i + 1}: ${allFiles[i]}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
