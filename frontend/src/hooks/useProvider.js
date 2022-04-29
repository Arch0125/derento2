import { ethers } from "ethers"

function useProvider() {
  return new ethers.providers.Web3Provider(window.ethereum);
}

export default useProvider;