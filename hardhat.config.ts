/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import { HardhatUserConfig } from "hardhat/types";
import '@openzeppelin/hardhat-upgrades';

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-typechain";
import "dotenv/config";
import fs from "fs";
import path from "path";
const USER_HOME = process.env.HOME || process.env.USERPROFILE
let data = {
  "PrivateKey": "",
  "InfuraApiKey": "",
  "EtherscanApiKey": "",
};

let filePath = path.join(USER_HOME+'/.hardhat.data.json');
if (fs.existsSync(filePath)) {
  let rawdata = fs.readFileSync(filePath);
  data = JSON.parse(rawdata.toString());
}
filePath = path.join(__dirname, `.hardhat.data.json`);
if (fs.existsSync(filePath)) {
  let rawdata = fs.readFileSync(filePath);
  data = JSON.parse(rawdata.toString());
}


const DEFAULT_COMPILER_SETTINGS = {
  version: "0.8.11",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  networks: {
    hardhat: {},
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.DEPLOYER_PK+'']
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.DEPLOYER_PK+'']
    },
    bsctestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: [process.env.DEPLOYER_PK+'']
    },
    bscmainnet: {
      url: `https://bsc-dataseed.binance.org/`,
      accounts: [process.env.DEPLOYER_PK+'']
    },
  },
  etherscan: {
    apiKey: process.env.EXPLORER_API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 100000
  }
};

export default config;