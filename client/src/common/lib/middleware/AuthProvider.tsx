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
  console.log('auths', auth.isLoggedIn);

  return <div>{children} </div>;
}

export default AuthProvider;
