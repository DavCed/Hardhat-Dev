import { create } from 'ipfs-core';

export let ipfsNode = null;

export async function runIPFSNetwork(path,content) {
  ipfsNode = await create();
  const data = {
    path: path,
    content: content,
  };
  return data;
}

export async function addFileToIPFS(data) {
  const file = await ipfsNode.add(data);
  console.log(`Added File: ${file.path + ' ' + file.cid}`);
  console.log("*****************************************************************");
  ipfsNode.stop();
  return file.cid;
}
