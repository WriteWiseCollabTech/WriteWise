import { useState } from 'react';
import { Competition, PublicationType, NominationSource, Phase, Nomination, Vote } from '../types/Competition';

// Dummy Competitions
const competitionsData: Competition[] = [
  {
    id: 1,
    title: 'Best Research Paper 2024',
    description: 'A competition to nominate and vote on the best research papers of 2024.',
    phase: Phase.Nomination,
    publicationType: [PublicationType.Published],
    source: [NominationSource.Established],
    creator: 'user1',
    nominationDates: '2024-10-01 to 2024-10-15',
    votingDates: '2024-10-16 to 2024-10-30',
    choiceMetadata: 'Journal Publication, Peer Reviewed',
    maxNominations: 10,
    rewards: [
        { rank: 1, amount: 200 },
        { rank: 2, amount: 100 },
        { rank: 3, amount: 50 },
      ],
  },
  {
    id: 2,
    title: 'Top DeSci Papers 2024',
    description: 'A competition for decentralized science (DeSci) publications.',
    phase: Phase.Voting,
    publicationType: [PublicationType.PrePrint],
    source: [NominationSource.DeSci],
    creator: 'user1',
    nominationDates: '2024-09-01 to 2024-09-15',
    votingDates: '2024-09-16 to 2024-09-30',
    choiceMetadata: 'Preprint, Open Source',
    maxNominations: 15,
    rewards: [
        { rank: 1, amount: 150 },
        { rank: 2, amount: 70 },
        { rank: 3, amount: 20 },
      ],
  },
  {
    id: 3,
    title: 'Most Influential Paper 2024',
    description: 'Nominate and vote on the most influential papers of 2024.',
    phase: Phase.Closed,
    publicationType: [PublicationType.Published],
    source: [NominationSource.Established],
    creator: 'user1',
    nominationDates: '2024-08-01 to 2024-08-15',
    votingDates: '2024-08-16 to 2024-08-30',
    choiceMetadata: 'Magazine Publication, Peer Reviewed',
    maxNominations: 5,
    rewards: [
        { rank: 1, amount: 100 },
        { rank: 2, amount: 50 },
        { rank: 3, amount: 50 },
      ],
  },
];

// Dummy Nominations
export const nominationsData: Nomination[] = [
  {
    competitionId: '1',
    link: 'https://example.com/research-paper-1',
    description: 'A groundbreaking research paper on quantum computing applications in cryptography.',
    imageUrl: 'https://example.com/image1.jpg',
    reason: 'Innovative approach to applying quantum computing to cryptographic challenges.',
  },
  {
    competitionId: '2',
    link: 'https://example.com/decentralized-science',
    description: 'An open access preprint about decentralized science and its future.',
    imageUrl: 'https://example.com/image2.jpg',
    reason: 'Pioneering work in DeSci, advocating for open and decentralized publishing.',
  },
  {
    competitionId: '3',
    link: 'https://example.com/influential-paper',
    description: 'A paper that has significantly impacted modern machine learning techniques.',
    imageUrl: 'https://example.com/image3.jpg',
    reason: 'Has led to major advancements in the efficiency of machine learning algorithms.',
  },
];

// Dummy Votes
export const votesData: Vote[] = [
  {
    userId: 'user1',
    userAddress: '0x1234567890abcdef1234567890abcdef12345678',
    votes: '5',
  },
  {
    userId: 'user2',
    userAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    votes: '3',
  },
  {
    userId: 'user3',
    userAddress: '0x7890abcdef1234567890abcdef1234567890abcd',
    votes: '10',
  },
];


// Competition Data State
export const useCompetitionData = () => {
  // Competitions
  const [competitions, setCompetitions] = useState(competitionsData);

  // Nominations
  const [nominations, setNominations] = useState(nominationsData);

  // Votes
  const [votes, setVotes] = useState(votesData);

  // Functions to add new data
  const addCompetition = (competition: Competition) => {
    setCompetitions([...competitions, competition]);
  };

  const addNomination = (nomination: Nomination) => {
    setNominations([...nominations, nomination]);
  };

  const addVote = (vote: Vote) => {
    setVotes([...votes, vote]);
  };

  return {
    competitions,
    nominations,
    votes,
    addCompetition,
    addNomination,
    addVote,
  };
};
