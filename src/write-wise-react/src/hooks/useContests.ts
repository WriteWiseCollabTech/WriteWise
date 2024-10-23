import { useEffect, useState } from 'react';
import { useEthereumContext } from '../contexts/EthereumContext';
import { Competition } from '../types/Competition';
import { useCompetitionData } from '../data/competitonData';

export const useContests = () => {
  const { provider } = useEthereumContext();
  const [contests, setContests] = useState<Competition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { competitions } = useCompetitionData()

  useEffect(() => {
    const fetchContests = async () => {
        console.log(provider)
    if (provider){
        try {
          setLoading(true);
          setContests(competitions)
        } catch (err) {
          console.error('Error fetching contests:', err);
          setError('Could not fetch contests.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchContests();
  }, [provider,competitions]);

  return { contests, loading, error };
};
