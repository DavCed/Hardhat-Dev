require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY_4 = process.env.PRIVATE_KEY_4
const PRIVATE_KEY_5 = process.env.PRIVATE_KEY_5
const RPC = process.env.RPC

const SEPOLIA_PK = process.env.SEPOLIA_PK
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
      accounts: [SEPOLIA_PK],
      chainId: 11155111,
    },
    geth: {
      url: RPC,
      accounts: [PRIVATE_KEY_4, PRIVATE_KEY_5],
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
