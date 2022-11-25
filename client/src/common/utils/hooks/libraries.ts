import { useQuery } from '@tanstack/react-query';
import { getLibraries } from './api/library';

export const useLibraries = () => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`/libraries`],
    () => getLibraries(),
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.error(`Error getting libraries: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
