import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import '../assets/css/style.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SEO from '../../next-seo.config';
import Footer from '../common/components/Footer';
import { Header } from '../common/components/Header';
import ReactToaster from '../common/components/layout/Toaster';
import { useCurrentUser } from '../common/utils/hooks/user';
const queryClient = new QueryClient();

export default function App({ Component, pageProps, router }: AppProps) {
  const nextRouter = useRouter();
  useEffect(() => {
    useCurrentUser();
  }, []);
  const pagesWithoutHeader = [
    '/new',
    '/component/[id]/preview',
    '/component/[id]/edit',
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen ">
        {!pagesWithoutHeader.includes(nextRouter.pathname) && <Header />}
        <Analytics /> <ReactToaster />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} key={router.route} />
      </div>
      {!pagesWithoutHeader.includes(nextRouter.pathname) && <Footer />}
    </QueryClientProvider>
  );
}
