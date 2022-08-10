import { useQuery } from '@tanstack/react-query';
import { User } from '../../components/User';
import { useAuthState } from './../../../store/auth';
import { getCurrentUser, getUser } from './api/user';

export const useUserProfile = (id: string) => {
  const { isLoading, error, data } = useQuery(
    ['user/' + id],
    () => getUser(id),
    {
      refetchOnWindowFocus: false,
      onError: (e) => console.error(`Error loading user profile: ${e}`),
    },
  );

  return { isLoading, error, data: data };
};

export const useCurrentUser = async () => {
  const { payload, error } = await getCurrentUser();

  if (!error) {
    useAuthState.setState({
      user: payload?.results,
      isLoggedIn: true,
    });
  }
};

export const useLogout = async () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      localStorage.removeItem('access_token');
      useAuthState.setState({
        user: User.EmptyUserObject(),
        isLoggedIn: false,
      });
    }
  }
};
