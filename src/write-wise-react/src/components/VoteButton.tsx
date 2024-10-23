import React from 'react';
import { useEthereumContext } from '../contexts/EthereumContext';
import { useVote } from '../hooks/useVote';
import SuccessModal from './SuccessModal';

interface VoteButtonProps {
    nominationId: string;
    disabled: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({ nominationId, disabled }) => {
    const { account, connectWallet } = useEthereumContext();
    const { vote, isVoting, showSuccessModal, closeModal } = useVote();

    const handleVote = async () => {
        if (!account) {
            // Connect wallet if not connected
            await connectWallet();
            return;
        }
        // Proceed to vote once wallet is connected
        await vote(nominationId);
    };

    let buttonLabel = 'Vote';
    if (!account && !disabled) {
        buttonLabel = 'Connect Wallet to Vote';
    } else if (isVoting) {
        buttonLabel = 'Voting...';
    } else {
        buttonLabel = 'Vote';
    }

    return (
        <div className="flex-1 basis-1/2 relative">
            <button
                onClick={handleVote}
                className={`w-full py-2 border-none rounded cursor-pointer transition ${disabled
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                disabled={disabled || isVoting}
            >
                {buttonLabel}
            </button>

            {/* Success Modal */}
            {showSuccessModal && (
                <SuccessModal
                    header="Vote Submitted!"
                    message="Thank you for making your impact"
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default VoteButton;