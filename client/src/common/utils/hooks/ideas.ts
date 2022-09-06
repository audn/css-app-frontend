import { useQuery } from 'react-query';
import { Idea, User } from './../../lib/interfaces';
import { getIdeas, getUserIdeas } from './api/ideas';

export const useIdeas = (sort: Idea.SortBy) => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`/ideas?sort=${sort}`],
    () => getIdeas(sort),
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.error(`Error loading ideas: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
export const useUserIdeas = (sort: Idea.SortBy, user: User.User) => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`/user/${user.id}/ideas?sort=${sort}`],
    () => getUserIdeas(user.id),
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.error(`Error loading user ideas: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
