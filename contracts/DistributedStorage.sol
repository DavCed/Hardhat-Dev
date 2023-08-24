// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DistributedStorage {
    mapping(string cid => string url) private _files;
    File[] private allFiles;

    struct File {
        string cid;
        string url;
    }

    function storeFiles(File[] memory files) public {
        for (uint256 i = 0; i < files.length; i++) {
            if (checkAllFiles(files[i].cid)) {
                _files[files[i].cid] = files[i].url;
                allFiles.push(File(files[i].cid, files[i].url));
            }
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
        if (allFiles.length == 1) {
            delete _files[allFiles[0].cid];
            allFiles.pop();
        } else {
            for (uint256 i = 0; i < allFiles.length; i++) {
                delete _files[allFiles[i].cid];
                allFiles.pop();
            }
            if (allFiles.length != 0) allFiles.pop();
        }
        return allFiles;
    }
}
