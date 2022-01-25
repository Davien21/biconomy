import { ethers } from "ethers";
import { USDTContractAddress } from "../utils";
import { Biconomy } from "@biconomy/mexa";
import { config } from "./config";
import { formatEther, parseEther } from "ethers/lib/utils";

const tokenAddresses = {
  usdt: "0x8e1084f3599ba90991C3b2f9e25D920738C1496D",
  usdc: "0x6043fD7126e4229d6FcaC388c9E1C8d333CCb8fA",
  dai: "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",
};

export const connectToMetaMask = async (setError) => {
  try {
    if (!hasEthereum()) return false;

    await window.ethereum.request({ method: "eth_requestAccounts" });

    return true;
  } catch (error) {
    console.log(error);
    if (setError) setError(error.message ?? error.toString());
    return { error };
  }
};

export function getActiveWallet() {
  if (!hasEthereum()) return false;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = signer.provider.provider.selectedAddress;
  return address;
}

export function hasEthereum() {
  return window.ethereum ? true : false;
}

export async function getCurrentNetwork() {
  if (!hasEthereum()) return false;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const network = (await signer.provider._networkPromise).name;
  return network;
}

export function listenToAccountChanges(handler) {
  if (!hasEthereum()) return false;

  window.ethereum.on("accountsChanged", async (accounts) => {
    handler(accounts[0]);
  });
}

export async function unmountEthListeners() {
  window.ethereum.removeListener("accountsChanged", () => {});
  window.ethereum.removeListener("message", () => {});
}

export async function getTokenContract(signer, address) {
  const USDTAbi = await fetch(
    "https://api.etherscan.io/api?module=contract&action=getabi&address=0xdac17f958d2ee523a2206206994597c13d831ec7"
  ).then((r) => r.json());
  try {
    if (!hasEthereum()) return false;
    return new ethers.Contract(address, USDTAbi.result, signer);
  } catch (err) {
    console.log("failed to load contract", err);
  }
}

export async function getTokenGasPrice() {
  const biconomy = new Biconomy(window.ethereum, {
    apiKey: "T-jgoywWD.f34cc484-df0e-4e10-b8af-fac3fa09c2da",
    debug: true,
  });
  let ethersProvider = new ethers.providers.Web3Provider(biconomy);
  console.log({ ethersProvider });
}

export async function checkIFApproved(tokenAddress) {
  tokenAddress = tokenAddresses[tokenAddress.toLowerCase()];
  if (!hasEthereum()) return false;
  const network = await getCurrentNetwork();
  if (network && !network.includes("kovan")) return false;
  const biconomy = new Biconomy(window.ethereum, {
    apiKey: process.env.REACT_APP_BICONOMY_API_KEY,
    debug: true,
  });
  let ethersProvider = new ethers.providers.Web3Provider(biconomy);
  const signer = ethersProvider.getSigner();
  const address = await getActiveWallet();

  const tokenContract = await getTokenContract(signer, tokenAddress);

  const testContract = "0xbc4de0Fa9734af8DB0fA70A24908Ab48F7c8D75d";
  const approvedAmount = await tokenContract.allowed(testContract, address);
  return parseInt(approvedAmount) > 0;
}

export async function approveTokenForSpending(tokenAddress) {
  console.log("approving...");
  tokenAddress = tokenAddresses[tokenAddress.toLowerCase()];
  console.log(tokenAddress);

  if (!hasEthereum()) return false;
  const network = await getCurrentNetwork();
  if (network && !network.includes("kovan")) return false;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const tokenContract = await getTokenContract(signer, tokenAddress);
  await tokenContract.approve(
    "0xbc4de0Fa9734af8DB0fA70A24908Ab48F7c8D75d",
    parseEther("10").toString()
  );

  const testContract = "0xbc4de0Fa9734af8DB0fA70A24908Ab48F7c8D75d";
  const tx = await tokenContract.approve(
    testContract,
    parseEther("5").toString()
  );
  const a = await tx.wait();
  console.log(a);
}
