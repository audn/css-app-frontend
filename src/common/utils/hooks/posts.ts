import { useQuery } from '@tanstack/react-query';
import { API } from '../../lib/interfaces';
import { getAllPosts, searchPosts } from './api/posts';

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
export const useSearchPosts = (filter: API.Requests.SearchPosts) => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`posts/search?q=${filter.q}&options=${JSON.stringify(filter)}`],
    () => searchPosts(filter),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      onError: (e) => console.error(`Error getting posts: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
