import { useState } from 'react';
import { useEthereum } from './useEthereum';

export const useAddNomination = () => {
  const { account, connectWallet } = useEthereum();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const addNomination = async (nomination: { link: string; description: string; imageUrl: string; reason: string }) => {
    try {
      if (!account) {
        await connectWallet();
      }

      setIsAdding(true);
      // Simulate API call or blockchain transaction to add the nomination
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay

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
