import Router from 'next/router';
import { ReactNode } from 'react';
import { trackPageview } from '../utils/analytics';

Router.events.on('routeChangeComplete', (url) => {
  trackPageview(url);
});

type Props = {
  children: ReactNode;
};
export const DefaultLayout = ({ children }: Props) => {
  return (
    <div className="px-5 mt-5">
      <div className="container flex flex-col min-h-screen ">
        <div className="mt-24">
          <main className={'flex-1 w-full text-on-100'}>{children}</main>
        </div>
      </div>
    </div>
  );
};
