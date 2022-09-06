import axios from 'axios';
import { AppContext, AppProps } from 'next/app';
import qs from 'querystring';
import { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import 'react-loading-skeleton/dist/skeleton.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../assets/css/style.css';
import Header from '../common/components/Header';
import ReactToaster from '../common/layouts/Toaster';
import AuthProvider from '../common/lib/middleware/AuthProvider';
const queryClient = new QueryClient();

export default function App({
  props,
  Component,
  pageProps,
  router,
}: AppProps & { props: any }) {
  const { user, isLoggedIn } = props;
  const { pathname } = router;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, 50);
    }
  }, [pathname]);
  return (
    <AuthProvider auth={{ user, isLoggedIn }}>
      <CookiesProvider>
        <ReactToaster />
        <QueryClientProvider client={queryClient}>
          <Header />
          <Component {...pageProps} key={router.route} />
        </QueryClientProvider>
      </CookiesProvider>
    </AuthProvider>
  );
}

App.getInitialProps = async ({ ctx }: AppContext): Promise<any> => {
  const cookies = ctx.req?.headers.cookie as string;
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('access_token')
      : qs.decode(cookies, '; ').access_token;

  return axios
    .get(process.env.NEXT_PUBLIC_API_URL + '/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .then((data) => ({
      props: {
        user: data.data.payload.results,
        isLoggedIn: true,
      },
    }))
    .catch((error) => ({
      props: {
        user: error.message,
        isLoggedIn: false,
      },
    }));
};
