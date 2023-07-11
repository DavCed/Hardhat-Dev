import { expect } from "chai";
import { addFileToIPFS, runIPFSNetwork } from '../scripts/ipfs.mjs';

describe("Test IPFS process", function () {
    const dataTest = {
        path: 'testing',
        content: 'testing'
    };

    it("Should match data set constructed when IPFS node ran", async function () {
        const dataReturned = await runIPFSNetwork('testing','testing');
        expect(dataReturned.path).to.equal(dataTest.path);
        expect(dataReturned.content).to.equal(dataTest.content);
    });
    
    it("Should add file to IPFS network", async function () {
        const cid = await addFileToIPFS(dataTest);
        const content = await (await fetch(`http://ipfs.io/ipfs/${cid}`)).text();
        expect(content).to.equal(dataTest.content);
    });
});