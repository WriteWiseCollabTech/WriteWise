import { useState } from 'react';
import { useEthereumContext } from '../contexts/EthereumContext';
import { castVote } from '../contracts/contractService'

export const useVote = () => {
    const { createTransaction } = useEthereumContext();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isVoting, setIsVoting] = useState(false);

    const vote = async (nominationId: string) => {
        try {
            setIsVoting(true);
            // Blockchain voting logic goes here
            console.log(`Initiating vote transaction for nomination ${nominationId}...`);

            const voteTransaction = castVote(nominationId);
            await createTransaction(voteTransaction);

            // If transaction is successful
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error voting:", error);
            alert("An error occurred during the voting process. Please try again.");
        } finally {
            setIsVoting(false);
        }
    };

    const closeModal = () => {
        setShowSuccessModal(false);
    };

    return {
        vote,
        isVoting,
        showSuccessModal,
        closeModal,
    };
};
