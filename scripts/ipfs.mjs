import { create } from 'ipfs-core';

export let ipfsNode = null;

export async function runIPFSNetwork() {
  // Start IPFS network
  console.log('IPFS started running...');
  ipfsNode = await create();
}

export async function stopIPFSNetwork() {
  // Stop IPFS network
  console.log('IPFS stopped running...');
  ipfsNode.stop();
}

export async function addFileToIPFS(data) {
  // Add file to IPFS network
  const file = await ipfsNode.add(data);
  console.log(`Added File: ${file.cid}`);
  return file.cid;
}

export async function getFileFromIPFS(cid){
  // Get file from IPFS network
  const info = [];
  for await (const chunk of ipfsNode.cat(cid)) {
    info.push(chunk);
  }
  return info;
}
