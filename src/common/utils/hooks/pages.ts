import { useQuery } from '@tanstack/react-query';
import { API } from '../../lib/interfaces';
import { getAllPages, searchPages } from './api/pages';

export const useAllPages = () => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`/pages`],
    () => getAllPages(),
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.error(`Error getting pages: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
export const useSearchPages = (filter: API.Requests.SearchComponents) => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`pages/search?q=${filter.q}&options=${JSON.stringify(filter)}`],
    () => searchPages(filter),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      onError: (e) => console.error(`Error searching for pages: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
