export const getEthereum = (): import('ethers').providers.ExternalProvider | null => {
    if (typeof window !== 'undefined' && window.ethereum) {
      return window.ethereum;
    }
    return null;
  };