import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useQuery = () => {
  const [search] = useSearchParams();
  const query = useMemo(() => Object.fromEntries(search.entries()), [search]);

  return query;
};
