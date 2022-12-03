import { useQuery } from '@tanstack/react-query';
import { getCategories } from './api/categories';

export const useCategories = () => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`/categories`],
    () => getCategories(),
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.error(`Error getting categories: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
