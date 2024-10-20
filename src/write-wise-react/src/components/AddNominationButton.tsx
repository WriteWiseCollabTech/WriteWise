import React from 'react';
import { useEthereum } from '../hooks/useEthereum';
import { useAddNomination } from '../hooks/useAddNomination';
import SuccessModal from './SuccessModal';

interface AddNominationButtonProps {
  nomination: { link: string; description: string; imageUrl: string; reason: string };
}

const AddNominationButton: React.FC<AddNominationButtonProps> = ({ nomination }) => {
  const { account, connectWallet } = useEthereum();
  const { addNomination, isAdding, showSuccessModal, closeModal } = useAddNomination();

  const handleAddNomination = async () => {
    if (!account) {
      await connectWallet();
      return;
    }
    await addNomination(nomination);
  };

  return (
    <div className="relative">
      <button
        onClick={handleAddNomination}
        className={`w-full px-5 py-2 border-none rounded cursor-pointer transition ${
          isAdding
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
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default AddNominationButton;
