import React from 'react';
import { Nomination, Phase } from '../types/Competition';
import VoteButton from './VoteButton'

interface NominationsListProps {
    phase: Phase;
    nominations: Nomination[];
    userHasVoted: boolean;
    onViewDetails: (nomination: Nomination, userHasVoted: boolean) => void;
    onSuccess: () => void;
}

const NominationsList: React.FC<NominationsListProps> = ({ phase, nominations, userHasVoted, onViewDetails, onSuccess }) => {

    if (nominations.length === 0) {
        return (
            <div className="text-center text-gray-600 mt-10">
                <p>No nominations available for this competition.</p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {nominations.map((nomination) => (
                <div key={nomination.id} className="p-4 border rounded-lg shadow-md bg-white">

                    <h1 className="text-xl font-bold text-primary mb-1">{nomination.title}</h1>
                    {/* Nomination Image Placeholder */}
                    <div className="w-full h-32 mb-4 overflow-hidden rounded-lg">
                        <img
                            src={nomination.imageUrl}
                            alt={nomination.description}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Nomination Details */}
                    <h2 className="text-sm text-textGray mb-1">{nomination.description}</h2>
                    <p className="text-textGray font-semibold mb-2">Why it matters</p>
                    <p className="text-textGray mb-4">{nomination.reason}</p>
                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button className="flex-1 basis-1/2 py-2 border border-primary  bg-white text-primary"
                            onClick={() => onViewDetails(nomination, userHasVoted)}>
                            Read Paper
                        </button>
                        <VoteButton nominationId={nomination.id} disabled={userHasVoted || phase !== Phase.Voting} onSuccess={() => onSuccess} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NominationsList;
