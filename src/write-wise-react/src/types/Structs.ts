export interface ContestBlockchain {
    metadata: string;
    start: bigint;
    end: bigint;
    nomination_allowlist: string[];
    vote_allowlist: string[];
    manager: string;
    pause: boolean;
  }
  
  export interface NominationBlockchain {
    contestId: string;
    metadata: string;
    manager: string;
  }

  export interface VoteBlockchain {
    nominationId: string; 
    sender: string;
    dt: string;
  }