import { assert, expect } from "chai";
import { loadContract, deployContract, contract, storeOnChain, transactionResponse, getFromChain } from "../scripts/main.mjs";
import data from "../artifacts/contracts/DistributedStorage.sol/DistributedStorage.json" assert {type:'json'};

describe("Test contract deployment", function () {
    const bytecode = data.bytecode;
    const deployedCodeStored = data.deployedBytecode;

    it("Should load contract from compiled bytecode", async function () {
        const contractFactoryTest = await loadContract("DistributedStorage");
        expect(contractFactoryTest.bytecode).to.equal(bytecode);
    });
    
    it("Should deploy contract with compiled bytecode", async function () {
        await deployContract();
        const deployedCode = (await contract.getDeployedCode()).toString();
        expect(deployedCode).to.equal(deployedCodeStored);
    });
    
    it("Should call storeFile function on chain", async function () {
        const transactionResponseTest = await storeOnChain('testing','testing');
        expect(transactionResponseTest.data).to.equal(transactionResponse.data);
    });
    
    it("Should call getFile function on chain", async function () {
        const content = await getFromChain('testing');
        expect(content).to.equal('testing');
    });
});