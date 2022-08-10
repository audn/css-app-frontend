import { ReactNode } from 'react';
import concat from '../../../utils/helpers/concat';

function P({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={concat(
        className ? className : '',
        'text-base text-center leading-8',
      )}
    >
      {children}
    </p>
  );
}

export default P;
