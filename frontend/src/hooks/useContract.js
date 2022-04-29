import contracts from "../contracts";
import { ethers } from "ethers"

function useContract(contractName) {
  const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
  const tempSigner = tempProvider.getSigner();

  const contract = new ethers.Contract(contracts[contractName].address, contracts[contractName].abi, tempSigner);

  return contract;
}

export default useContract;