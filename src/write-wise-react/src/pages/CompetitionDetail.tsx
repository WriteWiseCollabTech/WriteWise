import React from 'react';
import { Competition } from '../types/Competition';
import PhaseTabs from '../components/PhaseTabs';


interface CompetitionDetailsPageProps {
  competition: Competition;
  onViewNominations: () => void;
}

const CompetitionDetailsPage: React.FC<CompetitionDetailsPageProps> = ({ competition, onViewNominations }) => {
  return (
    <div className="p-5">
    {/* Title Section */}
     <h1 className="text-3xl font-bold text-blue-600 mb-5">View Competition</h1>
     {/* Competition Details */}
    <div className="mb-5 text-left">
        <h2 className="text-xl font-semibold mb-2">Title</h2>
        <p className="text-gray-800 mb-3">{competition.title}</p>

        <h2 className="text-xl font-semibold mb-2">Creator</h2>
        <p className="text-gray-800 mb-3">{competition.creator}</p>

        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-800 mb-5">{competition.description}</p>

         {/* View Nominations Button */}
         <button 
         className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition mb-5"
         onClick={onViewNominations}>
          VIEW 0 NOMINATIONS
        </button>
    </div>
    {/* Phase Section */}
    <PhaseTabs currentPhase={competition.phase} layout="vertical" />


      {/* Prizes Section */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Prizes</h2>
        <div className="space-y-2">
         {competition.rewards.map((reward) => (
            <div key={reward.rank} className="flex items-center justify-center p-3 bg-gray-200 rounded-lg">
            <span className="text-lg font-semibold text-center mr-2">
              {reward.rank}
              {reward.rank === 1 ? 'st' : reward.rank === 2 ? 'nd' : reward.rank === 3 ? 'rd' : 'th'} Winner: {reward.amount} ARB
            </span>
            <span role="img" aria-label="trophy" className="text-xl">
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
