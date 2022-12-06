import { useQuery } from '@tanstack/react-query';
import useAuthState from '../../store/auth';
import { getCurrentUser, getUser } from './api/user';

export async function useCurrentUser() {
  const data = await getCurrentUser();
  if (data.payload?.results.id) {
    useAuthState.setState({
      user: data.payload.results,
      isLoggedIn: true,
    });
  }
}

export const useGetUser = (id: string) => {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    [`/posts`, id],
    () => getUser(id),
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.error(`Error getting user: ${e}`),
    },
  );

  return { isLoading, error, data: data, refetch, isRefetching };
};
