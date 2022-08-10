import { ReactNode } from 'react';
import { useAuthState } from '../../../../../store/auth';

function AuthUser({ children }: { children: ReactNode }) {
  const isLoggedIn = useAuthState((s) => s.isLoggedIn);
  if (isLoggedIn) {
    return <>{children}</>;
  } else return <></>;
}

export default AuthUser;
