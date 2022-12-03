import useAuthState from '../../store/auth';
import { getCurrentUser } from './api/user';

export async function useCurrentUser() {
  const data = await getCurrentUser();
  if (data.payload?.results.id) {
    useAuthState.setState({
      user: data.payload.results,
      isLoggedIn: true,
    });
  }
}
