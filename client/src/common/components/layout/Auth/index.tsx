import { ReactNode } from 'react';
import AuthAdmin from './Admin';
import AuthPolicy from './Policy/Policy';
import AuthUser from './User';

type Props = {
  children: ReactNode;
};
const Auth = {
  Admin: ({ ...props }: Props) => {
    return <AuthAdmin {...props} />;
  },
  User: ({ ...props }: Props) => {
    return <AuthUser {...props} />;
  },
  Policy: ({ policy, ...props }: Props & { policy: boolean }) => {
    return <AuthPolicy policy={policy} {...props} />;
  },
};

export default Auth;
