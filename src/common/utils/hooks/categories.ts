import { useQuery } from '@tanstack/react-query';
import { IPostSchemas } from './../../lib/interfaces';
import { getCategories } from './api/categories';

export const useCategories = (type: IPostSchemas) => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`/categories?type=${type}`],
    () => getCategories(type),
    {
      refetchOnWindowFocus: false,
      onError: (e) =>
        console.error(`Error getting categorie for ${type}: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
