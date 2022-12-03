import { ReactNode } from 'react';
import concat from '../../../utils/helpers/concat';

export const ButtonWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={concat(className ? className : '', 'flex gap-3 flex-wrap')}>
      {children}
    </div>
  );
};
