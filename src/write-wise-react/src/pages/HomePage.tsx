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
            <h1 className="text-4xl font-bold mb-4 text-left">WriteWise</h1>
            <h2 className="text-lg text-gray-700 text-left">Top Competitions</h2>
            <div className="mb-10">
                {loading ? (
                    <p className="text-gray-500">Loading competitions...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : contests.length > 0 ? (
                    contests.map((competition) => (
                        <div
                            key={competition.id}
                            onClick={() => onViewDetails(competition)}
                            className="p-4 mb-4 border rounded shadow-md bg-white hover:bg-gray-100 transition text-left"
                        >

                            <h2 className="text-xl font-semibold">{competition.title}</h2>
                            <p className="text-sm text-gray-500">
                                Phase: {competition.phase}
                            </p>
                            <p className="text-sm text-gray-500">
                                Creator: {competition.creator}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No competitions available</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;

// <p className="text-sm text-gray-500">{competition.rewards}</p> 