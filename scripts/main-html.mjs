import hre from "hardhat";

const contractFactory = await hre.ethers.getContractFactory(
  "DistributedStorage"
);

const contract = await contractFactory.deploy();
await contract.deploymentTransaction().wait(4);

const address = (await contract.getAddress()).toString();
console.log(`Contract Address (Distributed Storage): ${address}`);
