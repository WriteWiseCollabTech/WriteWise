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
    id: number;
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
    competitionId: string;
    link: string;
    description: string;
    imageUrl: string
    reason: string;
  }

  export interface Vote {
    userId: string;
    userAddress: string;
    votes: string;
  }
  