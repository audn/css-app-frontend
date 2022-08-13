import { ReactNode } from 'react';
import concat from '../../../utils/helpers/concat';

function Charlie({
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
        'text-xl font-bold text-center leading-8',
      )}
    >
      {children}
    </h3>
  );
}

export default Charlie;
