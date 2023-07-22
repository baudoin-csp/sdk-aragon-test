import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Wallet } from "@ethersproject/wallet";
import { Context, ContextParams } from "@aragon/sdk-client";
import { SupportedNetwork } from "@aragon/sdk-client-common";

// Set up your IPFS API key. You can get one either by running a local node or by using a service like Infura or Alechmy.
// Make sure to always keep these private in a file that is not committed to your public repository.
export const IPFS_API_KEY: string = "b477RhECf8s8sdM7XrkLBs2wHc4kCMwpbcFC55Kt";

// OPTION A: The simplest ContextParams you can have is this. This uses our default values and should work perfectly within your product.
const minimalContextParams: ContextParams = {
  // Choose the network you want to use. You can use "goerli" (Ethereum) or "maticmum" (Polygon) for testing, or "mainnet" (Ethereum) and "polygon" (Polygon) for mainnet.
  network: SupportedNetwork.GOERLI,
  web3Providers: "https://eth.llamarpc.com",
  // This is the signer account who will be signing transactions for your app. You can use also use a specific account where you have funds, through passing it `new Wallet("your-wallets-private-key")` or pass it in dynamically when someone connects their wallet to your dApp.
  signer: Wallet.createRandom(),
};

// OPTION B: For a more advanced option, you can use the following ContextParams. This will allow you to use your own custom values if desired.
export const contextParams: ContextParams = {
  // Choose the network you want to use. You can use "goerli" (Ethereum) or "maticmum" (Mumbai) for testing, or "mainnet" (Ethereum) and "polygon" (Polygon) for mainnet.
  network: "goerli",
  // This is the account that will be signing transactions for your app. You can use also use a specific account where you have funds, through passing it `new Wallet("your-wallets-private-key")` or pass it in dynamically when someone connects their wallet to your dApp.
  signer: Wallet.createRandom(),
  // Optional on "rinkeby", "arbitrum-rinkeby" or "mumbai"
  // Pass the address of the  `DaoFactory` contract you want to use. You can find it here based on your chain of choice: https://github.com/aragon/core/blob/develop/active_contracts.json
  // Optional. Leave it empty to use Aragon's DAO Factory contract and claim a dao.eth subdomain
  daoFactoryAddress: "0x1234381072385710239847120734123847123",
  // Optional. Pass the address of the ensRegistry for networks other than Mainnet or Goerli.
  // It will default to the registry deployed by Aragon. You can check them here: https://github.com/aragon/osx/blob/develop/active_contracts.json
  ensRegistryAddress: "0x1234381072385710239847120734123847123",
  // Choose your Web3 provider: Cloudfare, Infura, Alchemy, etc.
  // Remember to change the list of providers if a different network is selected
  web3Providers: ["https://rpc.ankr.com/eth_goerli"],
  // Optional. By default, it will use Aragon's provided endpoints.
  // They will switch depending on the network (production, development)
  ipfsNodes: [
    {
      url: "https://test.ipfs.aragon.network/api/v0",
      headers: { "X-API-KEY": IPFS_API_KEY || "" },
    },
  ],
  // Optional. By default it will use Aragon's provided endpoints.
  // They will switch depending on the network (production, development)
  graphqlNodes: [
    {
      url: "https://subgraph.satsuma-prod.com/aragon/core-goerli/api",
    },
  ],
};

// After defining the context parameters, you'll use them to instantiate the Aragon SDK context
export const context: Context = new Context(contextParams); // or minimalContextParams
// Instantiate the Aragon SDK context
export const minimalContext: Context = new Context(minimalContextParams);

/* MARKDOWN
Update the context with new parameters if you wish to throughout your app.
*/

context.set({ network: 1 });
context.set({ signer: new Wallet("private key") }); // if you're using wagmi library, you can also get the signer through their [`useSigner` method](https://wagmi.sh/react/hooks/useSigner) inside a `useEffect` hook.
context.set(contextParams);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
