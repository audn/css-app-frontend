import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const DefaultLayout = ({ children }: Props) => {
  return (
    <div className="px-5">
      <div className="container flex flex-col min-h-screen ">
        <main className={'flex-1 w-full text-on-100'}>{children}</main>
      </div>
    </div>
  );
};
