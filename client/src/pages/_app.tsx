import { AppProps } from 'next/app';
import '../assets/css/style.css';

import { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import 'react-loading-skeleton/dist/skeleton.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '../common/components/Header';
import { setCurrentUser } from '../common/utils/hooks/user';
const queryClient = new QueryClient();

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    setCurrentUser();
  }, []);

  return (
    <CookiesProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <QueryClientProvider client={queryClient}>
        <Header />
        <Component {...pageProps} key={router.route} />
      </QueryClientProvider>
    </CookiesProvider>
  );
}
