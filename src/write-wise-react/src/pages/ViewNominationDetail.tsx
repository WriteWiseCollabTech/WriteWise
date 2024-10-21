import React from 'react';
import { Nomination, Phase } from '../types/Competition';
import VoteButton from '../components/VoteButton';
import PhaseTabs from '../components/PhaseTabs';

interface ViewDetailsPageProps {
    nomination: Nomination;
    competitionPhase: Phase;
    onBack: () => void;
}

const ViewDetailsPage: React.FC<ViewDetailsPageProps> = ({ nomination, competitionPhase, onBack }) => {
    return (
        <div className="p-5">
            {/* Title Section */}
            <h1 className="text-3xl font-bold text-blue-600 mb-5">View Publication</h1>

            {/* Phase Tabs Component */}
            <PhaseTabs currentPhase={competitionPhase} layout="horizontal" />

            {/* Embedded PDF Viewer */}
            <div className="mb-5">
                <h2 className="text-xl font-semibold mb-2">Publication</h2>
                <iframe
                    src={nomination.link}
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
                        <VoteButton nominationId={nomination.link} disabled={competitionPhase !== Phase.Voting} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewDetailsPage;
