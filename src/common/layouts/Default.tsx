import { ReactNode } from 'react';
import concat from '../utils/helpers/concat';

type Props = {
  children: ReactNode;
  className?: string;
};
export const DefaultLayout = ({ children, className }: Props) => {
  return (
    <div className={concat(className ? className : '')}>
      <main className={'flex-1 w-full text-on-100'}>{children}</main>
    </div>
  );
};
