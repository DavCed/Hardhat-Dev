// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DistributedStorage {
    mapping(string cid => string url) private _files;

    function storeFile(string memory cid, string memory url) public {
        _files[cid] = url;
    }

    function getFile(string memory cid) public view returns (string memory) {
        return _files[cid];
    }
}
