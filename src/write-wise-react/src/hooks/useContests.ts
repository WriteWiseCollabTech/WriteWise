import { useEffect, useState } from 'react';
import { useEthereumContext } from '../contexts/EthereumContext';
import { getAllContests } from '../contracts/contractService';
import { Competition } from '../types/Competition';
import { useCompetitionData } from '../data/competitonData';

export const useContests = () => {
  const { provider, createReadOperation } = useEthereumContext();
  const [contests, setContests] = useState<Competition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { competitions } = useCompetitionData()

  useEffect(() => {
    const fetchContests = async () => {
        console.log(provider)
    if (provider){
        try {
        console.log("start fetchContests")
          setLoading(true);
          const contestTransaction = getAllContests();
          const contests = await createReadOperation(contestTransaction);
          if(contests.length == 0){
            setContests(competitions)
          }else{
            setContests(contests)
          }
        } catch (err) {
          console.error('Error fetching contests:', err);
          setError('Could not fetch contests.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchContests();
  }, [provider, createReadOperation, competitions]);

  return { contests, loading, error };
};
