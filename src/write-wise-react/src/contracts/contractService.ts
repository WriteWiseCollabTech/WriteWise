import { ethers } from 'ethers';
import MyContractABI from './WriteWiseABI.json';
import { CONTRACT_ADDRESS } from './config';
import { Competition, Nomination, Vote } from '../types/Competition'
import { ContestBlockchain, NominationBlockchain, VoteBlockchain } from '../types/Structs'
import { parseCompetitionMetadata, parseNominationMetadata, parseVote } from "../utils/metadata"

// Get contract instance
export const getContractInstance = (providerOrSigner: ethers.Provider | ethers.Signer) => {
    return new ethers.Contract(CONTRACT_ADDRESS, MyContractABI, providerOrSigner);
};

export const getVoteCount = (nominationId: string) => {
    return async (provider: ethers.Provider) => {
        const contract = getContractInstance(provider);
        const voteCount = await contract.getVoteTotal(nominationId);
        return voteCount;
    };
};

export const getCompetitionInfo = (contestId: string) => {
    return async (provider: ethers.Provider) => {
        const contract = getContractInstance(provider);
        const contest = await contract.contest(contestId);
        return contest;
    };
};


export const newNomination = (contestId: string, metadata: string, account: string) => {
    return async (signer: ethers.Signer) => {
        const contract = getContractInstance(signer);
        return await contract.newNomination(contestId, metadata, account);
    };
};


export const castVote = (nominationId: string) => {
    return async (signer: ethers.Signer) => {
        const contract = getContractInstance(signer);
        return await contract.castVote(nominationId);
    };
};



export const getAllContests = () => {
    return async (provider: ethers.Provider) => {
        const contract = getContractInstance(provider);
        const contests: Array<Competition> = [];
        try {
            let idCounter = 1;
            while (true) {
                const contestId = `0x${idCounter.toString(16).padStart(64, '0')}`; // Format as 32-byte hex
                try {
                    const contestData: ContestBlockchain = await contract.contest(contestId);
                    if (!contestData) {
                        break;
                    }
                    const contest = parseCompetitionMetadata(contestData, contestId)
                    contests.push(contest);
                    idCounter++;
                } catch (error) {
                    console.log(`didnt find contest ${idCounter} with error ${error}`)
                    // If the contract doesn't have the given contestId, break the loop
                    break;
                }
            }
        } catch (error) {
            console.error("Error getting contests:", error);
        }
        return contests;
    };
};

export const getAllNominations = () => {
    return async (provider: ethers.Provider) => {
        const contract = getContractInstance(provider);
        const nominations: Array<Nomination> = [];
        try {
            let idCounter = 1;
            while (true) {
                const nominationId = `0x${idCounter.toString(16).padStart(64, '0')}`; // Format as 32-byte hex
                try {
                    const nominationBlockchain: NominationBlockchain = await contract.nomination(nominationId);
                    if (!nominationBlockchain) {
                        break;
                    }
                    const nomination = parseNominationMetadata(nominationBlockchain, nominationId)
                    nominations.push(nomination);
                    idCounter++;
                } catch (error) {
                    console.log(`didnt find nomination ${idCounter} with error ${error}`)
                    // If the contract doesn't have the given contestId, break the loop
                    break;
                }
            }
        } catch (error) {
            console.error("Error getting nominations:", error);
        }
        return nominations;
    };
};

export const getAllVotes = () => {
    return async (provider: ethers.Provider) => {
        const contract = getContractInstance(provider);
        const votes: Array<Vote> = [];
        try {
            let idCounter = 0;
            while (true) {
                try {
                    const voteBlockchain: VoteBlockchain = await contract.vote(idCounter);
                    if (!voteBlockchain) {
                        break;
                    }
                    const vote = parseVote(voteBlockchain)
                    votes.push(vote);
                    idCounter++;
                } catch (error) {
                    console.log(`didnt find nomination ${idCounter} with error ${error}`)
                    // If the contract doesn't have the given contestId, break the loop
                    break;
                }
            }
        } catch (error) {
            console.error("Error getting votes:", error);
        }
        return votes;
    };
};

