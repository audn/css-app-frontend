import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import '../assets/css/style.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import SEO from '../../next-seo.config';
import Footer from '../common/components/Footer';
import { Header } from '../common/components/Header';
import SelectCreateType from '../common/components/Header/SelectType';
import ReactToaster from '../common/components/layout/Toaster';
import Sidebar from '../common/components/Sidebar';
import useSidebarState from '../common/store/sidebar';
import concat from '../common/utils/helpers/concat';
import { useCurrentUser } from '../common/utils/hooks/user';
const queryClient = new QueryClient();

export default function App({ Component, pageProps, router }: AppProps) {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const isSidebarCollapsed = useSidebarState((s) => s.isCollapsed);

  useEffect(() => {
    useCurrentUser();
  }, []);
  //   const pagesWithoutSidebar = ['/layout/[id]'];

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={concat(
          //   !pagesWithoutSidebar.includes(router.pathname) ? '' : '!ml-0',
          isSidebarCollapsed ? 'sm:ml-[70px]' : 'sm:ml-[290px]',
          'flex min-h-screen transition-all ease-out duration-75',
        )}
      >
        {/* {!pagesWithoutSidebar.includes(router.pathname) && ( */}

        <div className="hidden sm:flex">
          <Sidebar
          //   toggleCreateType={() => setIsCreateOpen(!isCreateOpen)}
          />
        </div>
        {/* )} */}
        {isCreateOpen && (
          <SelectCreateType
            isOpen={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
          />
        )}
        <div className="flex flex-col w-full ">
          <div className="sticky top-0 z-50 flex sm:hidden">
            <Header />
          </div>{' '}
          <div className="relative min-h-screen p-6 md:px-10 md:py-8">
            <Analytics /> <ReactToaster />
            <DefaultSeo {...SEO} />
            <Component {...pageProps} key={router.route} />
          </div>
          <Footer />
        </div>
      </div>
    </QueryClientProvider>
  );
}
