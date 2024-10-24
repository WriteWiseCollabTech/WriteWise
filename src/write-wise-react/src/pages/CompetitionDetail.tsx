import React from 'react';
import { Competition, Nomination, Phase } from '../types/Competition';
import PhaseTabs from '../components/PhaseTabs';
import { useNominations } from "../hooks/useNominations"


interface CompetitionDetailsPageProps {
    competition: Competition;
    onViewNominations: (nominations: Nomination[]) => void;
}

const CompetitionDetailsPage: React.FC<CompetitionDetailsPageProps> = ({ competition, onViewNominations }) => {
    const { nominations, loading } = useNominations();
    const nominationSize = nominations.filter((nomination) => nomination.competitionId === competition.id).length

    return (
        <div>
            {/* Title Section */}
            <h1 className="text-3xl font-semi-bold text-center mt-5 text-primary mb-5">View Competition</h1>
            {/* Phase Section */}
            <PhaseTabs currentPhase={competition.phase} layout="horizontal" />

            {/* Competition Details */}
            <div className="mb-5 text-left">
                <p className="text-xl font-semibold text-textGray">{competition.title}</p>
                <p className="text-textGray mb-5">{competition.creator}</p>
                <h2 className="text-sm text-textGray font-semibold mb-2">Description</h2>
                <p className="text-textGray mb-5">{competition.description}</p>

                {/* View Nominations Button */}
                {loading ? (
                    <div className="text-center mb-5">
                        <span>Loading nominations...</span>
                    </div>
                ) : (
                    <button
                        className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition mb-5"
                        onClick={() => onViewNominations(nominations)}>
                        View {nominationSize} Nominations 
                    </button>
                )}
            </div>

            {/* Prizes Section */}
            <div className="mb-5">
                <h2 className="text-xl font-semibold text-textGray text-center mb-3">Prizes</h2>
                <div className="space-y-2">
                    {competition.rewards.map((reward) => (
                        <div
                            key={reward.rank}
                            className="flex tems-center justify-center p-4 border-2 border-primary rounded-lg mb-3 text-primary font-semibold"
                        >
                            <span className="text-center">
                                {reward.rank}
                                {reward.rank === 1 ? 'st' : reward.rank === 2 ? 'nd' : reward.rank === 3 ? 'rd' : 'th'} Winner: {reward.amount} ARB
                            </span>
                            {competition.phase === Phase.Closed && (
                                <span className="ml-2">- {reward.winner}</span>
                            )}
                            <span role="img" aria-label="trophy" className="ml-2">
                                🏆
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompetitionDetailsPage;
