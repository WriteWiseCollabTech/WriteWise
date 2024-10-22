import React from 'react';
import { useEthereumContext } from '../contexts/EthereumContext';
import { useAddNomination } from '../hooks/useAddNomination';
import SuccessModal from './SuccessModal';
import { Nomination } from '../types/Competition';

interface AddNominationButtonProps {
  nomination: Nomination;
  onSuccess: () => void;
}

const AddNominationButton: React.FC<AddNominationButtonProps> = ({ nomination, onSuccess }) => {
  const { account, connectWallet } = useEthereumContext();
  const { addNomination, isAdding, showSuccessModal, closeModal } = useAddNomination();

  const handleAddNomination = async () => {
    if (!account) {
      await connectWallet();
    }
    if (account) {
      await addNomination(nomination);
    }
  };

  const handleCloseModal = () => {
    closeModal();
    onSuccess(); // Navigate back after closing the modal
  };

  return (
    <div className="relative">
      <button
        onClick={handleAddNomination}
        className={`w-full px-5 py-2 border-none rounded cursor-pointer transition ${isAdding
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        disabled={isAdding}
      >
        {account ? (isAdding ? 'Adding Nomination...' : 'Submit Nomination') : 'Connect Wallet to Add Nomination'}
      </button>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          header="Nomination Submitted!"
          message="Thank you for your contribution to decentralizing research publications."
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AddNominationButton;
