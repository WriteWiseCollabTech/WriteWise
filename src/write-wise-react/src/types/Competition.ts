export enum Phase {
    NotStarted = 'Not Started',
    Nomination = 'Nomination',
    Voting = 'Voting',
    Closed = 'Closed'
}

export enum PublicationType {
    PrePrint,
    Published
}

export enum NominationSource {
    DeSci,
    Established
}

export interface Rewards {
    rank: number;
    amount: number;
}

export interface Competition {
    id: string;
    title: string;
    description: string;
    phase: Phase,
    publicationType: PublicationType[],
    source: NominationSource[], 
    nominationDates: string;
    votingDates: string;
    creator: string;
    choiceMetadata: string;
    maxNominations: number;
    rewards: Rewards[];
  }

  export interface Nomination {
    id: string;
    competitionId: string;
    title: string;
    link: string;
    description: string;
    imageUrl: string
    reason: string;
    nominator: string;
    voteCount: number;
  }

  export interface Vote {
    nominationId: string;
    userAddress: string;
    votes: string;
  }
  