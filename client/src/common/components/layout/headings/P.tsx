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
        'text-base leading-8 whitespace-pre-line break-all',
      )}
    >
      {children}
    </p>
  );
}

export default P;
