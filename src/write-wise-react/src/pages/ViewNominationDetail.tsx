import React from 'react';
import { Nomination, Phase } from '../types/Competition';
import VoteButton from '../components/VoteButton';

interface ViewDetailsPageProps {
    nomination: Nomination;
    competitionPhase: Phase;
    userHasVoted: boolean;
    onBack: () => void;
}

const ViewDetailsPage: React.FC<ViewDetailsPageProps> = ({ nomination, competitionPhase, userHasVoted, onBack }) => {
    return (
        <div className="p-5">
            {/* Title Section */}
            <h1 className="text-3xl font-semi-bold text-center text-primary mb-5">Read Paper</h1>

            {/* Embedded PDF Viewer */}
            <div className="mb-5">
                <iframe
                    src={`${nomination.link}#toolbar=0`}
                    title="Publication PDF"
                    className="w-full h-[500px] border rounded-lg"
                ></iframe>
            </div>

            {/* Back and Voting Buttons */}
            <div className="flex gap-4">
                <button
                    className="flex-1 basis-1/2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                    onClick={onBack}
                >
                    Back
                </button>
                {competitionPhase === Phase.Voting && (
                    <div className="flex-1 basis-1/2">
                        <VoteButton nominationId={nomination.id} disabled={userHasVoted || competitionPhase !== Phase.Voting} onSuccess={() => onBack()} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewDetailsPage;
