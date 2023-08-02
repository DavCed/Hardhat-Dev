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
        if (checkAllFiles(cid)) {
            _files[cid] = url;
            allFiles.push(File(cid, url));
        }
    }

    function getFile(string memory cid) public view returns (string memory) {
        return _files[cid];
    }

    function getAllFiles() public view returns (File[] memory) {
        return allFiles;
    }

    function checkAllFiles(string memory cid) public view returns (bool) {
        for (uint256 i = 0; i < allFiles.length; i++) {
            if (keccak256(bytes(allFiles[i].cid)) == keccak256(bytes(cid))) {
                return false;
            }
        }
        return true;
    }

    function removeAllFiles() public returns (File[] memory) {
        for (uint256 i = 0; i < allFiles.length; i++) {
            allFiles.pop();
            delete _files[allFiles[i].cid];
        }
        if (allFiles.length != 0) allFiles.pop();
        return allFiles;
    }
}
