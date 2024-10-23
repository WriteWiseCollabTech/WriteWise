import React from 'react';
import { useEthereumContext } from '../contexts/EthereumContext';

const ConnectWalletButton: React.FC = () => {
    const { account, connectWallet } = useEthereumContext();

    return (
        <button
            onClick={connectWallet}
            className={`px-5 py-2 fill-white border-none rounded shadow-lg transition-all duration-300 ${account ? 'text-green-500' : 'text-primary'
                }`}
        >   
            {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
        </button>
    );
};

export default ConnectWalletButton;
