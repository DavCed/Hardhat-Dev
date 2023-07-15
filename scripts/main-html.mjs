import hre from "hardhat";

let contract = null;

async function main() {
  const contractFactory = await hre.ethers.getContractFactory(
    "DistributedStorage"
  );
  contract = await contractFactory.deploy();
  await contract.deploymentTransaction().wait(4);
  const address = (await contract.getAddress()).toString();
  console.log(`Contract Address (Distributed Storage): ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
