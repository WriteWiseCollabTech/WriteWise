import React, { useState, useEffect, useCallback } from 'react';
import PhaseTabs from '../components/PhaseTabs'; // Corrected to default import
import { Competition, Phase, Nomination, Vote } from '../types/Competition';
import NominationsList from '../components/NominationList';
import { useVotes } from '../hooks/useVotes';
import { useEthereumContext } from '../contexts/EthereumContext';
import { useNominations } from "../hooks/useNominations"
import { convertNominationToBlockchain } from '../utils/metadata';

interface ViewNominationsPageProps {
  competition: Competition;
  onBack: () => void;
  onAddNomination: () => void;
  onViewNominationDetails: (nomination: Nomination, userHasVoted: boolean) => void;
}

const ViewNominationsPage: React.FC<ViewNominationsPageProps> = ({ competition, onBack, onAddNomination, onViewNominationDetails }) => {
  const { nominations, loading: nominationsLoading, refetch: refetchNomination } = useNominations();
  const { votes, loading: votesLoading, refetch: refetchVotes } = useVotes();
  const { account } = useEthereumContext();

  nominations.forEach((nomination) => {
    convertNominationToBlockchain(nomination)
  });

  const filteredNominations = nominations.filter((nomination) => nomination.competitionId === competition.id);

  const [updatedNominations, setUpdatedNominations] = useState<Nomination[]>([]);
  const [userHasVoted, setUserHasVoted] = useState<boolean>(false);

  const refetchData = useCallback(() => {
    refetchNomination();
    refetchVotes();
  }, [refetchNomination, refetchVotes]);



  useEffect(() => {
    if (!votesLoading && !nominationsLoading && filteredNominations.length > 0) {
      // First, filter votes that belong to the current list of nominations
      const nominationIds = filteredNominations.map((nomination) => nomination.id);
      const filteredVotes = votes.filter((vote) => nominationIds.includes(vote.nominationId));

      // Update the nominations with vote count
      const newNominations = filteredNominations.map((nomination) => {
        // Calculate vote count for each nomination
        const voteCount = filteredVotes.filter((vote) => vote.nominationId === nomination.id).length;

        return {
          ...nomination,
          voteCount,
        };
      });

      // Check if the user has already voted for any nomination in this competition
      const hasVoted = filteredVotes.some((vote: Vote) => vote.userAddress.toLowerCase() === account?.toLowerCase());

      if (JSON.stringify(updatedNominations) !== JSON.stringify(newNominations)) {
        setUpdatedNominations(newNominations);
      }

      if (userHasVoted !== hasVoted) {
        setUserHasVoted(hasVoted);
      }
    }
  }, [votes, votesLoading, nominationsLoading, filteredNominations, account, updatedNominations, userHasVoted]);


  if (nominationsLoading || votesLoading) {
      return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      {/* Title Section */}
      <h1 className="text-3xl font-semi-bold text-primary text-center mb-5">View Nominations</h1>

      {/* Phase Tabs Component */}
      <PhaseTabs currentPhase={competition.phase} layout="horizontal" />

      {/* Add Nomination Button - Visible only during Nomination Phase */}
      {(
        <div className="mb-5">
          <button
            className="w-full bg-primary text-white font-semibold py-2 rounded-l mt-5 items-center justify-center space-x-2"
            onClick={onAddNomination}
          >
             <span className="text-2xl font-bold">+</span>
             <span className="text-lg">Add Nomination</span>
          </button>
        </div>
      )}

      {/* Nominations List */}
      {nominationsLoading ? (
        <p>Loading nominations...</p>
      ) : (
        <NominationsList
          nominations={updatedNominations}
          userHasVoted={userHasVoted}
          phase={competition.phase}
          onViewDetails={onViewNominationDetails}
          onSuccess={refetchData}
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
