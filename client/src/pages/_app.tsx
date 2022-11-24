import { AppProps } from 'next/app';
import '../assets/css/style.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import { useEffect } from 'react';
import SEO from '../../next-seo.config';
import Footer from '../common/components/Footer';
import { Header } from '../common/components/Header';
import { useCurrentUser } from '../common/utils/hooks/user';
const queryClient = new QueryClient();

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    useCurrentUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <DefaultSeo {...SEO} />
      <Component {...pageProps} key={router.route} />
      <Footer />
    </QueryClientProvider>
  );
}
