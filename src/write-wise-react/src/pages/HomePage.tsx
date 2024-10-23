import React from 'react';
import { Competition } from '../types/Competition';
import { useContests } from "../hooks/useContests"


interface HomePageProps {
    onViewDetails: (competition: Competition) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onViewDetails }) => {
    const { contests, loading, error } = useContests();

    return (
        <div className="p-8">
            <h1 className="text-4xl text-primary font-semi-bold mb-4 text-left">WriteWise</h1>
            <p className="text-left text-textGray">Make your impact on research publications around the world</p>
            <h2 className="mt-4 text-lg text-textGray font-bold text-left">Top Competitions</h2>
            <div className="mb-10">
                {loading ? (
                    <p className="text-gray-500">Loading competitions...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : contests.length > 0 ? (
                    contests.map((competition) => {
                        const totalRewards = competition.rewards?.reduce((acc, reward) => acc + reward.amount, 0) || 0;
                        return (
                            <div
                                key={competition.id}
                                onClick={() => onViewDetails(competition)}
                                className="p-4 mb-4 border rounded shadow-md bg-white hover:bg-gray-100 transition text-left"
                            >
                                <p className=" inline-block text-xs text-white bg-primary py-1 px-1 rounded-md">
                                    {totalRewards} ARB
                                </p>
                                <h2 className="text-xl mt-2 text-primary font-semibold">{competition.title}</h2>
                                <p className="text-sm text-textGray font-semibold">
                                    {competition.phase} Phase
                                </p>
                                <p className="text-sm text-textGray">
                                    {competition.creator}
                                </p>
                            </div>
                        )
                    })
                ) : (
                    <p className="text-gray-500">No competitions available</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;

// <p className="text-sm text-gray-500">{competition.rewards}</p> 