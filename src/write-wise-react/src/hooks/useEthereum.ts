import { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';

export interface EthereumHook {
    provider: ethers.BrowserProvider | null;
    signer: ethers.Signer | null;
    account: string | null;
    connectWallet: () => Promise<void>;
    createTransaction: (/*txDetails: ethers.TransactionRequest */) => Promise<void>;
}

const ARBITRUM_GOERLI_PARAMS = {
    chainId: '0x66eee', // 421614 in hex
    chainName: 'Arbitrum Sepolia Testnet',
    rpcUrls: ['https://arbitrum-sepolia.blockpi.network/v1/rpc/public'],
    nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrls: ['https://sepolia-explorer.arbitrum.io'],
};


export const useEthereum = (): EthereumHook => {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [account, setAccount] = useState<string | null>(null);

    const retrieveAndSetAccount = useCallback(async (browserProvider: ethers.BrowserProvider) => {
        try {
            const accounts = await browserProvider.send('eth_accounts', []);
            if (accounts.length > 0) {
                const walletSigner = await browserProvider.getSigner();
                console.log(walletSigner)
                setSigner(walletSigner);
                setAccount(accounts[0]);
                localStorage.setItem('connectedAccount', accounts[0]);
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

                const savedAccount = localStorage.getItem('connectedAccount');
                if (savedAccount) {
                    setAccount(savedAccount);
                    const walletSigner = await browserProvider.getSigner();
                    setSigner(walletSigner);
                } else {
                    // Try to retrieve the current connected account from the wallet provider
                    await retrieveAndSetAccount(browserProvider);
                }
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

    const createTransaction = useCallback(async (/*txDetails: ethers.TransactionRequest */) => {
        if (!signer) {
            throw new Error('No signer available. Please connect your wallet.');
        }

        // Ensure on Arbitrum network before creating the transaction


        try {
            await ensureOnArbitrumNetwork();
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay for blockchain transaction
            //const tx = await signer.sendTransaction(txDetails);
            //console.log('Transaction sent:', tx);
            //await tx.wait(); // Wait for transaction to be confirmed
            //console.log('Transaction confirmed:', tx);
            //return tx;
        } catch (error) {
            console.error('Error sending transaction:', error);
            throw error;
        }
    }, [signer, ensureOnArbitrumNetwork]);

    return {
        provider,
        signer,
        account,
        connectWallet,
        createTransaction
    };
};
