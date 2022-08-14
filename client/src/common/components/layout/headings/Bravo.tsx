import { ReactNode } from 'react';
import concat from '../../../utils/helpers/concat';

function Bravo({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={concat(
        className ? className : '',
        'font-bold text-white text-2xl mb-3',
      )}
    >
      {children}
    </h2>
  );
}

export default Bravo;
