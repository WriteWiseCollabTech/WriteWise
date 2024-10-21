import React from 'react';
import { useCompetitionData } from '../data/competitonData';
import { Competition } from '../types/Competition';


interface HomePageProps {
    onViewDetails: (competition: Competition) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onViewDetails }) => {

    const { competitions } = useCompetitionData();
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-4 text-left">WriteWise</h1>
            <h2 className="text-lg text-gray-700 text-left">Top Competitions open to voting</h2>
            <div className="mb-10">
                {competitions.length > 0 ? (
                    competitions.map((competition) => (
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