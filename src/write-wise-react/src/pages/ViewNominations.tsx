import React from 'react';
import PhaseTabs from '../components/PhaseTabs'; // Corrected to default import
import { Competition, Phase, Nomination } from '../types/Competition';
import NominationsList from '../components/NominationList';
//import { useVotes } from '../hooks/useVotes';
//import { useEthereumContext } from '../contexts/EthereumContext';
import { useNominations } from "../hooks/useNominations"

interface ViewNominationsPageProps {
  competition: Competition;
  onBack: () => void;
  onAddNomination: () => void;
  onViewNominationDetails: (nomination: Nomination) => void;
}

const ViewNominationsPage: React.FC<ViewNominationsPageProps> = ({ competition, onBack, onAddNomination, onViewNominationDetails }) => {
  const { nominations, loading: nominationsLoading } = useNominations();
  //const { votes, loading } = useVotes();
  //const { account } = useEthereumContext();

  const filteredNominations = nominations.filter((nomination) => nomination.competitionId === competition.id);

  return (
    <div className="p-5">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-blue-600 mb-5">View Nominations</h1>

      {/* Phase Tabs Component */}
      <PhaseTabs currentPhase={competition.phase} layout="horizontal" />

      {/* Add Nomination Button - Visible only during Nomination Phase */}
      {competition.phase === Phase.Nomination && (
        <div className="mb-5">
          <button
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
            onClick={onAddNomination}
          >
            Add Nomination
          </button>
        </div>
      )}

      {/* Nominations List */}
      {nominationsLoading ? (
        <p>Loading nominations...</p>
      ) : (
        <NominationsList
          nominations={filteredNominations}
          phase={competition.phase}
          onViewDetails={onViewNominationDetails}
        />
      )}

      {/* Back Button */}
      <div className="mt-10">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewNominationsPage;
