import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

interface EthereumHook {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  account: string | null;
  connectWallet: () => Promise<void>;
}

export const useEthereum = (): EthereumHook => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const initProvider = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(browserProvider);
      }
    };
    initProvider();
  }, []);

  const connectWallet = async () => {
    if (provider) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletSigner = await provider.getSigner();
        const userAccount = await walletSigner.getAddress();
        setSigner(walletSigner);
        setAccount(userAccount);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.error('Ethereum wallet not detected. Please install MetaMask or another wallet provider.');
    }
  };

  return {
    provider,
    signer,
    account,
    connectWallet,
  };
};
