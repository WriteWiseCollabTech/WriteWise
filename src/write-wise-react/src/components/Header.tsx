import React from 'react';
import ConnectWalletButton from './ConnectWalletButton';

interface HeaderProps {
    onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
    return (
        <header className="flex justify-between items-center">
            {/* Home Button */}
            <button
                onClick={onHomeClick}
                className="px-5 py-5 fill-white border-none rounded"
            >
                <img
                    src="https://i.imgur.com/NOe5pHH.png"
                    alt="Home"
                    className="w-12 h-12 object-contain rounded-full transition-all duration-300 hover:opacity-80"
                />
            </button>

            {/* Connect Wallet Button */}
            <ConnectWalletButton />
        </header>
    );
};

export default Header;
