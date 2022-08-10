import { useRouter } from 'next/router';
import React, { ReactElement, SyntheticEvent } from 'react';
import { Button } from '../../../lib/interfaces';

function Controller({
  route,
  onClick,
  children,
}: Button.Base & { children: ReactElement }) {
  const router = useRouter();
  function handleClick(e: SyntheticEvent) {
    if (route) {
      router.push(route);
    } else if (onClick) onClick(e);
  }
  return <>{React.cloneElement(children, { onClick: handleClick })}</>;
}

export default Controller;
