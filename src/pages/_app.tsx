import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import '../assets/css/style.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import SEO from '../../next-seo.config';
import SelectCreateType from '../common/components/Header/SelectType';
import ReactToaster from '../common/components/layout/Toaster';
import Sidebar from '../common/components/Sidebar';
import { useCurrentUser } from '../common/utils/hooks/user';
const queryClient = new QueryClient();

export default function App({ Component, pageProps, router }: AppProps) {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  //   const nextRouter = useRouter();
  useEffect(() => {
    useCurrentUser();
  }, []);
  //   const pagesWithoutHeader = [
  //     '/new',
  //     '/component/[id]/preview',
  //     '/component/[id]/edit',
  //   ];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen ml-[290px]">
        <Sidebar toggleCreateType={() => setIsCreateOpen(!isCreateOpen)} />
        {isCreateOpen && (
          <SelectCreateType
            isOpen={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
          />
        )}
        <div className="flex flex-col w-full">
          {/* {!pagesWithoutHeader.includes(nextRouter.pathname) && <Header />} */}
          <div className="px-10 py-8">
            <Analytics /> <ReactToaster />
            <DefaultSeo {...SEO} />
            <Component {...pageProps} key={router.route} />
          </div>
          {/* {!pagesWithoutHeader.includes(nextRouter.pathname) && <Footer />} */}
        </div>
      </div>
    </QueryClientProvider>
  );
}
