import { useRouter } from 'next/router';
import { ReactElement, SyntheticEvent } from 'react';
import { Button } from '../../../lib/interfaces';

function Controller({
  route,
  onClick,
  children,
  layoutClass,
}: Button.Base & { children: ReactElement }) {
  const router = useRouter();
  function handleClick(e: SyntheticEvent) {
    if (route) {
      router.push(route);
    } else if (onClick) onClick(e);
  }

  return (
    <span className={layoutClass ? layoutClass : ''} onClick={handleClick}>
      {children}
    </span>
  );
}

export default Controller;
