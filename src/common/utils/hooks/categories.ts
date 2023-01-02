import { useQuery } from '@tanstack/react-query';
import { getCategories } from './api/categories';

export const useCategories = (type?: 'pages' | 'components') => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`/categories`],
    () => getCategories(type),
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.error(`Error getting categories: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
