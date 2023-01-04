import { useQuery } from '@tanstack/react-query';
import { API } from '../../lib/interfaces';
import { getAllComponents, searchComponents } from './api/components';

export const useAllComponents = () => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`/components`],
    () => getAllComponents(),
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.error(`Error getting components: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
export const useSearchComponents = (filter: API.Requests.SearchComponents) => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`components/search?q=${filter.q}&options=${JSON.stringify(filter)}`],
    () => searchComponents(filter),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      onError: (e) => console.error(`Error searching for components: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
