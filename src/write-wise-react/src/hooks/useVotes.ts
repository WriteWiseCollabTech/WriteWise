import { useCallback, useEffect, useState } from 'react';
import { useEthereumContext } from '../contexts/EthereumContext';
import { getAllVotes } from '../contracts/contractService';
import { Vote } from '../types/Competition';
import { useCompetitionData } from '../data/competitonData';

export const useVotes = () => {
  const { provider, createReadOperation } = useEthereumContext();
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { votes: allData } = useCompetitionData()

    const fetchVotes = useCallback(async () => {
        console.log(provider)
    if (provider){
        try {
        console.log("start fetchNominations")
          setLoading(true);
          const contestTransaction = getAllVotes();
          const voteList = await createReadOperation(contestTransaction);
          if(voteList.length > 0){
            setVotes(voteList)
          }else{
            setVotes(allData)
          }
        } catch (err) {
          console.error('Error fetching nominations:', err);
          setError('Could not fetch nominations.');
        } finally {
          setLoading(false);
        }
      }
    }, [provider, createReadOperation, allData]);

    useEffect(() => {
        fetchVotes();
      }, [fetchVotes]);

  return { votes, loading, error, refetch: fetchVotes };
};
