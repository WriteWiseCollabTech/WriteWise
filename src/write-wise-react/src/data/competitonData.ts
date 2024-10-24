import { useState } from 'react';
import { Competition, PublicationType, NominationSource, Phase, Nomination, Vote } from '../types/Competition';

// Dummy Competitions
const competitionsData: Competition[] = [
  {
    id: '0x0000000000000000000000000000000000000000000000000000000000000001',
    title: 'Innovations in Healthcare Systems',
    description: 'A competition focused on exploring technological advancements and innovative models that can improve healthcare systems worldwide.',
    phase: Phase.Nomination,
    publicationType: [PublicationType.Published],
    source: [NominationSource.Established],
    creator: 'samharris.eth',
    nominationDates: '2024-10-26',
    votingDates: '2024-10-30',
    choiceMetadata: 'Journal Publication, Peer Reviewed',
    maxNominations: 10,
    rewards: [
        { rank: 1, amount: 200, winner: '' },
        { rank: 2, amount: 100, winner: '' },
        { rank: 3, amount: 50, winner: '' },
      ],
  },
  {
    id: '0x0000000000000000000000000000000000000000000000000000000000000006',
    title: 'Impact of Universal Basic Income',
    description: "A competition exploring research on the effects of Universal Basic Income (UBI) across different nations, focusing on poverty alleviation and social mobility. Researchers are invited to submit papers investigating UBI's role in reducing inequality, fostering economic stability, and influencing labor markets worldwide.",
    phase: Phase.Voting,
    publicationType: [PublicationType.PrePrint],
    source: [NominationSource.DeSci],
    creator: 'hassanfikri.eth',
    nominationDates: '2024-10-26',
    votingDates: '2024-10-28',
    choiceMetadata: 'Preprint, Open Source',
    maxNominations: 15,
    rewards: [
        { rank: 1, amount: 150, winner: '' },
        { rank: 2, amount: 70, winner: '' },
        { rank: 3, amount: 20, winner: '' },
      ],
  },
  {
    id: '0x0000000000000000000000000000000000000000000000000000000000000007',
    title: 'Biology & Quantified Self Movement',
    description: 'This competition highlights research on the intersection of biology and technology in the quantified self movement. Papers should focus on how biological data collection through personal devices informs health decisions, self-awareness, and preventive healthcare, impacting both individual well-being and public health strategies.',
    phase: Phase.Closed,
    publicationType: [PublicationType.Published],
    source: [NominationSource.Established],
    creator: 'jennyblock.eth',
    nominationDates: '2024-10-10',
    votingDates: '2024-10-14',
    choiceMetadata: 'Magazine Publication, Peer Reviewed',
    maxNominations: 5,
    rewards: [
        { rank: 1, amount: 100, winner: 'maria.eth'},
        { rank: 2, amount: 50, winner: 'tomH.eth' },
        { rank: 3, amount: 50, winner: 'seth.eth' },
      ],
  },
];

// Dummy Nominations
export const nominationsData: Nomination[] = [
  {
    id: '0x0000000000000000000000000000000000000000000000000000000000000001',
    competitionId: '0x0000000000000000000000000000000000000000000000000000000000000001',
    title: 'Healthcare AI: Predicting Outcomes with Machine Learning',
    link: 'https://descier.mypinata.cloud/ipfs/QmSriSFFwoXDtE8MrrJAzs3GpqzjK3aZYo7QZMK1wsp6sQ',
    description: 'This paper explores AI’s ability to predict patient outcomes, optimizing treatments and reducing hospital readmissions.',
    imageUrl: 'https://cdn.discordapp.com/attachments/1291675751250132992/1298264354667495424/image3.jpg?ex=6718ee66&is=67179ce6&hm=e3375c5b493a6c4a01061cc7ed3fed494033111a0b9a1207f63c256639eeb983&',
    reason: 'Nominated for its ground-breaking application of AI in healthcare, showcasing how technology can',
    nominator: 'user1',
    voteCount: 0
  },
  {
    id: '0x0000000000000000000000000000000000000000000000000000000000000002',
    competitionId: '0x0000000000000000000000000000000000000000000000000000000000000001',
    title: 'CRISPR: Advancements in Gene Editing for Disease Prevention',
    link: 'https://descier.mypinata.cloud/ipfs/QmSriSFFwoXDtE8MrrJAzs3GpqzjK3aZYo7QZMK1wsp6sQ',
    description: 'A comprehensive review of how CRISPR technology revolutionizes gene editing, particularly in preventing genetic disorders',
    imageUrl: 'https://cdn.discordapp.com/attachments/1291675751250132992/1298264354080165971/image.jpg?ex=6718ee66&is=67179ce6&hm=9ba58c30d9f77c1f6fb992eba7e8ceda9ead88c76099f40f3ad0b4e4a53bcea5&',
    reason: 'transformative impact on disease prevention, highlighting its potential to eliminate hereditary conditions globally',
    nominator: 'user1',
    voteCount: 0
  },
  {
    id: '0x0000000000000000000000000000000000000000000000000000000000000003',
    competitionId: '0x0000000000000000000000000000000000000000000000000000000000000001',
    title: 'Advancing Precision Medicine in Oncology',
    link: 'https://descier.mypinata.cloud/ipfs/QmSriSFFwoXDtE8MrrJAzs3GpqzjK3aZYo7QZMK1wsp6sQ',
    description: 'Research advancing personalized cancer treatment through genetic profiling to improve patient outcomes and reduce adverse effects',
    imageUrl: 'https://cdn.discordapp.com/attachments/1291675751250132992/1298264354378092645/image2.jpg?ex=6718ee66&is=67179ce6&hm=03d666fddfeb0230a70089cc0ca81adc46e5b039c8bb53a2b7890157d552339c&',
    reason: 'This paper innovates cancer treatment by tailoring therapies to individual patients, enhancing effectiveness while minimizing harmful side effects',
    nominator: 'user1',
    voteCount: 0
  },
  {
    id: '0x0000000000000000000000000000000000000000000000000000000000000004',
    competitionId: '0x0000000000000000000000000000000000000000000000000000000000000006',
    title: 'Universal Basic Income in Finland: Long-term Economic Effects',
    link: 'https://descier.mypinata.cloud/ipfs/QmSriSFFwoXDtE8MrrJAzs3GpqzjK3aZYo7QZMK1wsp6sQ',
    description: "This paper evaluates the long-term economic impacts of Finland's UBI pilot, particularly on unemployment rates and income stability.",
    imageUrl: 'https://cdn.discordapp.com/attachments/1291675751250132992/1298264354969616414/Money.jpg?ex=6718ee66&is=67179ce6&hm=13de039019ba43e5037bf259c9168b7908a11c2350571849bb4d730497e5ec93&',
    reason: 'The study provides comprehensive data on how UBI reduces poverty and unemployment, making it a critical model for other countries.',
    nominator: 'user1',
    voteCount: 0
  },
  {
    id: '0x0000000000000000000000000000000000000000000000000000000000000005',
    competitionId: '0x0000000000000000000000000000000000000000000000000000000000000006',
    title: 'UBI and Gender Equality: A Global Perspective',
    link: 'https://descier.mypinata.cloud/ipfs/QmSriSFFwoXDtE8MrrJAzs3GpqzjK3aZYo7QZMK1wsp6sQ',
    description: "Research exploring the role of UBI in improving gender equality by enabling women to participate more in the workforce globally.",
    imageUrl: 'https://cdn.discordapp.com/attachments/1291675751250132992/1298264354969616414/Money.jpg?ex=6718ee66&is=67179ce6&hm=13de039019ba43e5037bf259c9168b7908a11c2350571849bb4d730497e5ec93&',
    reason: 'This paper highlights the unique socio-economic benefits UBI offers women, enhancing workforce participation and financial independence.',
    nominator: 'user1',
    voteCount: 0
  },
  {
    id: '0x0000000000000000000000000000000000000000000000000000000000000006',
    competitionId: '0x0000000000000000000000000000000000000000000000000000000000000006',
    title: 'Universal Basic Income and Mental Health Outcomes',
    link: 'https://descier.mypinata.cloud/ipfs/QmSriSFFwoXDtE8MrrJAzs3GpqzjK3aZYo7QZMK1wsp6sQ',
    description: "A detailed analysis of UBI's effects on mental health in low-income populations, focusing on stress reduction and improved quality of life.",
    imageUrl: '',
    reason: "The study emphasizes UBI's potential to significantly reduce mental health issues in marginalized groups by providing financial security.",
    nominator: 'user1',
    voteCount: 0
  }
];

// Dummy Votes
export const votesData: Vote[] = [
  {
    nominationId: '0x0000000000000000000000000000000000000000000000000000000000000001',
    userAddress: '0x1234567890abcdef1234567890abcdef12345678',
    votes: '5',
  },
  {
    nominationId: '0x0000000000000000000000000000000000000000000000000000000000000002',
    userAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    votes: '3',
  },
  {
    nominationId: '0x0000000000000000000000000000000000000000000000000000000000000003',
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
