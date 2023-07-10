// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DistributedStorage {
    mapping(string cid => string url) private _files;
    File[] private allFiles;

    struct File {
        string cid;
        string url;
    }

    function storeFile(string memory cid, string memory url) public {
        _files[cid] = url;
        File memory file = File(cid, url);
        allFiles.push(file);
    }

    function getFile(string memory cid) public view returns (string memory) {
        return _files[cid];
    }

    function getAllFiles() public view returns (File[] memory) {
        return allFiles;
    }
}
