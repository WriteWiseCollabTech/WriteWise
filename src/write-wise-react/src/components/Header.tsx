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
        className="px-5 py-2 text-white bg-blue-500 border-none rounded shadow-lg transition-all duration-300 hover:bg-blue-600"
      >
        Home
      </button>

      {/* Connect Wallet Button */}
      <ConnectWalletButton />
    </header>
  );
};

export default Header;
