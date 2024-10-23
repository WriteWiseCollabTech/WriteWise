import { useEffect, useState, useCallback } from 'react';
import { useEthereumContext } from '../contexts/EthereumContext';
import { getAllNominations } from '../contracts/contractService';
import { Nomination } from '../types/Competition';
import { useCompetitionData } from '../data/competitonData';

export const useNominations = () => {
  const { provider, createReadOperation } = useEthereumContext();
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { nominations: allData } = useCompetitionData()

  const fetchNominations = useCallback(async () => {
        console.log(provider)
    if (provider){
        try {
        console.log("start fetchNominations")
          setLoading(true);
          const contestTransaction = getAllNominations();
          const nominationsList = await createReadOperation(contestTransaction);
          if(nominationsList.length > 0){
            setNominations(nominationsList)
          }else{
            setNominations(allData)
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
        fetchNominations();
      }, [fetchNominations]);

  return { nominations, loading, error, refetch: fetchNominations };
};
