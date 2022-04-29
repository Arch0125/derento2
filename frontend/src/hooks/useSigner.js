import useProvider from './useProvider'

function useSigner() {
  const provider = useProvider()
  return provider.getSigner();
}

export default useSigner;