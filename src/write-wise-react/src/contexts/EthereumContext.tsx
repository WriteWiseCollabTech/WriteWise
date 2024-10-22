import React, { createContext, useContext, ReactNode } from 'react';
import { useEthereum, EthereumHook } from '../hooks/useEthereum';

const EthereumContext = createContext<EthereumHook | undefined>(undefined);

export const EthereumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ethereum = useEthereum();
  return <EthereumContext.Provider value={ethereum}>{children}</EthereumContext.Provider>;
};

export const useEthereumContext = () => {
  const context = useContext(EthereumContext);
  if (!context) {
    throw new Error('useEthereumContext must be used within an EthereumProvider');
  }
  return context;
};
