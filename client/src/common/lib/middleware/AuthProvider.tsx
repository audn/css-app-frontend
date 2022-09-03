import { ReactNode } from 'react';
import { User } from '../interfaces';
import { useAuthState } from '../store/auth';

function AuthProvider({
  auth,
  children,
}: {
  auth: { isLoggedIn: boolean; user: User.User };
  children: ReactNode;
}) {
  useAuthState.setState({ ...auth });
  return <div>{children} </div>;
}

export default AuthProvider;
