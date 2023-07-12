require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const GETH_PK_1 = process.env.GETH_PK_1
const GETH_PK_2 = process.env.GETH_PK_2
const GETH_RPC = process.env.GETH_RPC

const SEPOLIA_PK_2 = process.env.SEPOLIA_PK_2
const SEPOLIA_RPC = process.env.SEPOLIA_RPC
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const GANACHE_PK = process.env.GANACHE_PK
const GANACHE_RPC = process.env.GANACHE_RPC

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC,
      accounts: [SEPOLIA_PK_2],
      chainId: 11155111,
    },
    geth: {
      url: GETH_RPC,
      accounts: [GETH_PK_1, GETH_PK_2],
      chainId: 12345
    },
    ganache: {
      url: GANACHE_RPC,
      accounts: [GANACHE_PK],
      chainId: 1337
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};
