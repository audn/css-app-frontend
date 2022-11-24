import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from './api/posts';

export const useAllPosts = () => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`/posts`],
    () => getAllPosts(),
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.error(`Error getting posts: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
