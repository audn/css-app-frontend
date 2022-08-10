import { ILayout } from '../lib/interfaces';

import SeoTags from '../components/SeoTags';

import Router from 'next/router';
import { trackPageview } from '../utils/analytics';

Router.events.on('routeChangeComplete', (url) => {
  trackPageview(url);
});

export const DefaultLayout = ({ title, desc, url, children }: ILayout) => {
  return (
    <div className="flex flex-col min-h-screen">
      <SeoTags title={title} desc={desc} url={url} />
      <main className="w-full px-5 py-20 mx-auto">{children}</main>
    </div>
  );
};
