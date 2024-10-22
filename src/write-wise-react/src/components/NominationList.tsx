import React from 'react';
import { Nomination, Phase } from '../types/Competition';
import VoteButton from './VoteButton'

interface NominationsListProps {
    phase: Phase;
    nominations: Nomination[];
    onViewDetails: (nomination: Nomination) => void;
}

const NominationsList: React.FC<NominationsListProps> = ({ phase, nominations, onViewDetails }) => {

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

                    <h1 className="text-lg font-bold mb-1">{nomination.title}</h1>
                    {/* Nomination Image Placeholder */}
                    <div className="w-full h-32 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                        <img src={nomination.imageUrl} alt={nomination.description} className="h-full object-cover rounded-lg" />
                    </div>
                    {/* Nomination Details */}
                    <h2 className="text-lg font-bold mb-1">{nomination.description}</h2>
                    <p className="text-gray-700 font-semibold mb-2">Authors & Collaborators</p>
                    <p className="text-gray-600 mb-4">{nomination.reason}</p>
                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button className="flex-1 basis-1/2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            onClick={() => onViewDetails(nomination)}>
                            View Details
                        </button>
                        <VoteButton nominationId={nomination.id} disabled={phase !== Phase.Voting} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NominationsList;
