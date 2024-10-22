import { useState } from 'react';
import { useEthereumContext } from '../contexts/EthereumContext';
import { newNomination } from '../contracts/contractService'
import { Nomination } from '../types/Competition';
import { convertNominationToBlockchain } from '../utils/metadata'

export const useAddNomination = () => {
    const { account, connectWallet, createTransaction } = useEthereumContext();
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const addNomination = async (nomination: Nomination) => {
        try {
            if (!account) {
                await connectWallet();
            }
            if (!account) {
                throw new Error('Wallet not connected. Please connect your wallet to proceed.');
            }
            
            const nominationData: Nomination = {
                ...nomination,
                nominator: account,
              };
            const nominationBlockchain = convertNominationToBlockchain(nominationData)

            setIsAdding(true);
            // Simulate API call or blockchain transaction to add the nomination
            const transaction = newNomination(nominationBlockchain.contestId, nominationBlockchain.metadata, nominationBlockchain.manager)
            await createTransaction(transaction);

            // If successful, show success modal
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error adding nomination:", error);
            alert("An error occurred while adding the nomination. Please try again.");
        } finally {
            setIsAdding(false);
        }
    };

    const closeModal = () => {
        setShowSuccessModal(false);
    };

    return {
        addNomination,
        isAdding,
        showSuccessModal,
        closeModal,
    };
};
