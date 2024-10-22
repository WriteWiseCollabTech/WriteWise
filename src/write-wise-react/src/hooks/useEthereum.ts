import { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { ARBITRUM_GOERLI_PARAMS } from '../contracts/config'

export interface EthereumHook {
    provider: ethers.BrowserProvider | null;
    signer: ethers.Signer | null;
    account: string | null;
    connectWallet: () => Promise<void>;
    createTransaction: (transactionFunction: (signer: ethers.Signer) => Promise<any>) => Promise<any>;
    createReadOperation: (readFunction: (provider: ethers.Provider) => Promise<any>) => Promise<any>;
}

export const useEthereum = (): EthereumHook => {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [account, setAccount] = useState<string | null>(null);

    const retrieveAndSetAccount = useCallback(async (browserProvider: ethers.BrowserProvider) => {
        try {
          const accounts = await browserProvider.send('eth_accounts', []);
          if (accounts.length > 0) {
            const walletSigner = await browserProvider.getSigner();
            setSigner(walletSigner);
            setAccount(accounts[0]);
            localStorage.setItem('connectedAccount', accounts[0]);
          } else {
            setAccount(null);
            localStorage.removeItem('connectedAccount');
          }
        } catch (error) {
          console.error('Error retrieving account:', error);
        }
      }, []);

      useEffect(() => {
        const initProvider = async () => {
          if (typeof window !== 'undefined' && window.ethereum) {
            const browserProvider = new ethers.BrowserProvider(window.ethereum);
            setProvider(browserProvider);
    
            await retrieveAndSetAccount(browserProvider);
          }
        };
        initProvider();
      }, [retrieveAndSetAccount]);


    const switchToArbitrumNetwork = useCallback(async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: ARBITRUM_GOERLI_PARAMS.chainId }],
            });
        } catch (error: any) {
            // If the network is not added yet, add it
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [ARBITRUM_GOERLI_PARAMS],
                    });
                } catch (addError) {
                    console.error('Error adding Arbitrum network:', addError);
                    throw new Error('User canceled adding Arbitrum network.');
                }
            } else if (error.code === 4001) {
                console.error('User canceled switching to Arbitrum network:', error);
                throw new Error('User canceled switching to Arbitrum network.');
            } else {
                console.error('Error switching to Arbitrum network:', error);
                throw new Error('Failed to switch to Arbitrum network.');
            }
        }
    }, []);

    const connectWallet = useCallback(async () => {
        if (provider) {
            try {
                // Request account connection from the user
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // After requesting, retrieve and set the account details
                await retrieveAndSetAccount(provider);
                const currentNetwork = await provider.getNetwork();
                const currentChainId = Number(currentNetwork.chainId);
                if (currentChainId !== parseInt(ARBITRUM_GOERLI_PARAMS.chainId, 16)) {
                    await switchToArbitrumNetwork();
                }
            } catch (error) {
                console.error('Error connecting to wallet:', error);
            }
        } else {
            console.error('Ethereum wallet not detected. Please install MetaMask or another wallet provider.');
        }
    }, [provider, retrieveAndSetAccount, switchToArbitrumNetwork]);

    const ensureOnArbitrumNetwork = useCallback(async () => {
        if (!provider) {
            throw new Error('No provider available');
        }
        const currentNetwork = await provider.getNetwork();
        const currentChainId = Number(currentNetwork.chainId); // Convert bigint to number
        if (currentChainId !== parseInt(ARBITRUM_GOERLI_PARAMS.chainId, 16)) {
            console.log('User is not connected to Arbitrum network. Prompting switch.');
            try {
                await switchToArbitrumNetwork();
            } catch (error) {
                // If the user cancels the switch, we throw an error to stop the action
                console.error('Error ensuring Arbitrum network:', error);
                throw error; // Handle this error in the component
            }

        }

    }, [provider, switchToArbitrumNetwork]);

    const createTransaction = async (transactionFunction: (signer: ethers.Signer) => Promise<any>) => {
        if (!signer) {
            throw new Error('No signer available. Please connect your wallet.');
        }
        try {
            await ensureOnArbitrumNetwork();
            // Use the current state value of signer
            const result = await transactionFunction(signer);
            return result;
        } catch (error) {
            console.error('Error sending transaction:', error);
            throw error;
        }
    };

    const createReadOperation = async (readFunction: (provider: ethers.Provider) => Promise<any>) => {
        if (!provider) {
            throw new Error('No provider available. Please connect to the correct network.');
        }
        try {
            const result = await readFunction(provider);
            return result;
        } catch (error) {
            console.error('Error reading data:', error);
            throw error;
        }
    };

    return {
        provider,
        signer,
        account,
        connectWallet,
        createTransaction,
        createReadOperation
    };
};
