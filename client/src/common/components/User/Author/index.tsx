import { ReactNode } from 'react';
import Link from '../../layout/Link';

function UserAuthor({
  children,
  route,
}: {
  children: ReactNode;
  route: string;
}) {
  return (
    <Link rel="author" href={route}>
      {children}
    </Link>
  );
}

export default UserAuthor;
