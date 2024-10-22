import { Competition, Nomination, Phase, Vote } from "../types/Competition"
import { ContestBlockchain, NominationBlockchain, VoteBlockchain } from "../types/Structs";


export const parseCompetitionMetadata = (contest: ContestBlockchain, id: string): Competition => {
    const metadata = JSON.parse(contest.metadata);
  
    return {
      id: id,
      title: metadata.title,  // Extract title from metadata if applicable
      description: metadata.description,  // Extract description from metadata if applicable
      phase: metadata.phase as Phase,  // Parse the phase if it's stored in the metadata
      publicationType: metadata.publicationType,
      source: metadata.source,
      nominationDates: new Date(Number(contest.start) * 1000).toISOString(),  // Convert bigint timestamp to ISO string
      votingDates: new Date(Number(contest.end) * 1000).toISOString(),
      creator: contest.manager,
      choiceMetadata: metadata.choiceMetadata,
      maxNominations: metadata.maxNominations,
      rewards: metadata.rewards
    };
  };


  export const parseNominationMetadata = (nomination: NominationBlockchain, nominationId: string): Nomination => {
    const metadata = JSON.parse(nomination.metadata);
  
    return {
     title: metadata.title,
      competitionId: nomination.contestId,
      link: metadata.link,
      description: metadata.description,
      imageUrl: metadata.imageUrl,
      reason: metadata.reason,
      id: nominationId,  // Include the nomination ID for frontend purposes
      nominator: nomination.manager,  // Manager/creator of the nomination
    };
  };
  export const parseVote = (vote: VoteBlockchain): Vote => {
    return {
        nominationId: vote.nominationId,
        userAddress: vote.sender,
        votes: '1'
    }
  }

  export const convertNominationToBlockchain = (nomination: Nomination): NominationBlockchain => {
    const metadata = JSON.stringify({
      title: nomination.title,
      link: nomination.link,
      description: nomination.description,
      imageUrl: nomination.imageUrl,
      reason: nomination.reason,
    });
  
    return {
      contestId: nomination.competitionId,
      metadata,
      manager: nomination.nominator,  // Use nominator as the manager for blockchain
    };
  };

