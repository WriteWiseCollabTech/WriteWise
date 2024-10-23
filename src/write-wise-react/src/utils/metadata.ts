import { Competition, Nomination, Phase, Vote } from "../types/Competition"
import { ContestBlockchain, NominationBlockchain, VoteBlockchain } from "../types/Structs";
import { ethers } from 'ethers';


export const parseCompetitionMetadata = (contest: ContestBlockchain, id: string): Competition => {
    const metadata = decodeMetadataFromHex(contest.metadata)
  
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
    const metadata = decodeMetadataFromHex(nomination.metadata)
    return {
      title: metadata.title,
      competitionId: nomination.contestId,
      link: metadata.link,
      description: metadata.description,
      imageUrl: metadata.imageUrl,
      reason: metadata.reason,
      id: nominationId,  // Include the nomination ID for frontend purposes
      nominator: nomination.manager,  // Manager/creator of the nomination
      voteCount: 0
    };
  };

  export const encodeMetadataToHex = (metadata: Record<string, any>): string => {
    // Convert the metadata object to a JSON string
    const jsonString = JSON.stringify(metadata);
  
    // Convert the JSON string to a bytes array
    const bytesArray = ethers.toUtf8Bytes(jsonString);
  
    // Convert the bytes array to a hex string
    return ethers.hexlify(bytesArray);
  };

  export const decodeMetadataFromHex = (hexString: string): Record<string, any> => {
    // Convert the hex string to a bytes array
    const bytesArray = ethers.getBytes(hexString);
  
    // Convert the bytes array to a JSON string
    const jsonString = ethers.toUtf8String(bytesArray);
  
    // Parse the JSON string to an object
    return JSON.parse(jsonString);
  };


  export const parseVote = (vote: VoteBlockchain): Vote => {
    return {
        nominationId: vote.nominationId,
        userAddress: vote.sender,
        votes: '1'
    }
  }

  export const convertNominationToBlockchain = (nomination: Nomination): NominationBlockchain => {
    const metadataJson = {
      title: nomination.title,
      link: nomination.link,
      description: nomination.description,
      imageUrl: nomination.imageUrl,
      reason: nomination.reason,
    };
    const metadata = encodeMetadataToHex(metadataJson)
    return {
      contestId: nomination.competitionId,
      metadata,
      manager: nomination.nominator,  // Use nominator as the manager for blockchain
    };
  };

