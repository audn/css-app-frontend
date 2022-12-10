import { useQuery } from '@tanstack/react-query';
import { getCategories } from './api/categories';

export const useCategories = (library?: string) => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`/categories`],
    () => getCategories(library),
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.error(`Error getting categories: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
