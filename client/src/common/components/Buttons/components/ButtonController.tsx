import { useRouter } from 'next/router';
import React, { ReactElement, SyntheticEvent } from 'react';
import { Button } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';
import { validateUrl } from '../../../utils/helpers/regex/url';

function ButtonController({
  route,
  onClick,
  children,
  layoutClass,
  className,
  trustRoute,
}: Button.Base & { children: ReactElement }) {
  const router = useRouter();

  function handleClick(e: SyntheticEvent) {
    e.stopPropagation();
    if (route) {
      if (validateUrl(route) && !trustRoute) {
        window.open(route);
      } else router.push(route);
    } else if (onClick) {
      onClick(e);
    }
  }

  return (
    <div
      className={concat(layoutClass ? layoutClass : '', '')}
      onClick={handleClick}
    >
      {React.cloneElement(children, { className })}
    </div>
  );
}

export default ButtonController;
