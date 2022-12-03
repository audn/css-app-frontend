import { ReactNode } from 'react';
import concat from '../../../utils/helpers/concat';

function FormWrapper({
  className,
  column,
  children,
}: {
  column?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={concat(
        column
          ? 'space-y-5'
          : 'sm:flex-row space-x-0 space-y-5 sm:space-y-0 sm:space-x-5',
        className ? className : '',
        'flex flex-col ',
      )}
    >
      {children}
    </div>
  );
}

export default FormWrapper;
