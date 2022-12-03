import { ReactNode } from 'react';

function AuthPolicy({
  children,
  policy,
}: {
  children: ReactNode;
  policy: boolean;
}) {
  if (policy) {
    return <>{children}</>;
  } else return <></>;
}

export default AuthPolicy;
