import { ReactNode } from 'react';
import concat from '../../../utils/helpers/concat';

function Delta({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={concat(
        className ? className : '',
        'text-lg font-bold leading-8',
      )}
    >
      {children}
    </h3>
  );
}

export default Delta;
