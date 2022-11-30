import { ReactNode } from 'react';
import concat from '../utils/helpers/concat';

type Props = {
  children: ReactNode;
  className?: string;
};
export const DefaultLayout = ({ children, className }: Props) => {
  return (
    <div className="px-5">
      <div
        className={concat(
          className ? className : '',
          'max-w-[92rem] mx-auto flex flex-col min-h-screen ',
        )}
      >
        <main className={'flex-1 w-full text-on-100'}>{children}</main>
      </div>
    </div>
  );
};
