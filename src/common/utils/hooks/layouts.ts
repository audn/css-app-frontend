import { useQuery } from '@tanstack/react-query';
import { API } from '../../lib/interfaces';
import { getAllLayouts, searchLayouts } from './api/layouts';

export const useAllLayouts = () => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`/layouts`],
    () => getAllLayouts(),
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.error(`Error getting layouts: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
export const useSearchLayouts = (filter: API.Requests.SearchComponents) => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`layouts/search?q=${filter.q}&options=${JSON.stringify(filter)}`],
    () => searchLayouts(filter),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      onError: (e) => console.error(`Error searching for layouts: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
