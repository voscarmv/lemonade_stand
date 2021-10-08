import HDWalletProvider from "truffle-hdwallet-provider";
import web3 from "web3";
import dotenv from 'dotenv';
dotenv.config();

const MNEMONIC = process.env.MNEMONIC;
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const isInfura = !!process.env.INFURA_KEY;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const NETWORK = process.env.NETWORK;

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.log('null');
  // console.error(
  //   "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  // );
  process.exit(1);
}

const NFT_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
    ],
    name: "mintTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

(
   async () => {
    const network =
      NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
    const provider = new HDWalletProvider(
      MNEMONIC,
      isInfura
        ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
        : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
    );
    const web3Instance = new web3(provider);
    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );
    try{
      let result = await nftContract.methods
        .mintTo(OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS });
      console.log(parseInt(result.events[0].raw.topics[3], 16));
      process.exit(0);
    } catch (e) {
      console.log('null');
      // console.log(e);
      process.exit(2);
    }
  }
)();
