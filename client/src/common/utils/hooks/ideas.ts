import { useQuery } from 'react-query';
import { Idea } from './../../lib/interfaces';
import { getIdeas } from './api/ideas';

export const useIdeas = (sort: Idea.SortBy) => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`/ideas?sort=${sort}`],
    () => getIdeas(sort),
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.error(`Error loading ideas: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
