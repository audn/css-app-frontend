import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Hydrate } from '../../common/components/Hydrate';
import { FadedLayout } from '../../common/layouts/FadeLayout';
import { API } from '../../common/lib/interfaces';
import { useSearchPosts } from '../../common/utils/hooks/posts';

export default function Home({ query }: { query: { library: string } }) {
  const router = useRouter();
  const storage =
    typeof window !== 'undefined' && localStorage.getItem('library');

  const [library, setLibrary] = useState<string>('TailwindCSS');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!storage) {
        if (query.library) {
          localStorage.setItem('libray', libraryValue(query.library));
        } else {
          localStorage.setItem('libray', 'TailwindCSS');
        }
        console.info('set library to tailwindcss');
      } else {
        setLibrary(storage);
      }
    }
  }, [storage]);

  const apiQuery: API.Requests.SearchPosts = {
    q: (router.query.q as string) || '*',
    filter: {
      library: library.toLowerCase(),
    },
  };
  const libraryValue = (val: string) => {
    switch (val) {
      case 'tailwindcss':
        return 'TailwindCSS';
      case 'bulma':
        return 'Bulma';
      case 'bootstrap':
        return 'Bootstrap';
      default:
        return 'TailwindCSS';
    }
  };
  const {
    data,
    isLoading,
    error: fetchError,
    refetch,
    isRefetching,
  } = useSearchPosts(apiQuery);

  return (
    <FadedLayout
      h1={
        <>
          A free library for hand-crafted components using{' '}
          <span className="text-brand-primary-150">{library}</span>
        </>
      }
      h3="Guides, Patch Notes and a warm community surrounding all CSS libraries."
    >
      <NextSeo title={`Browse components for ${libraryValue(query.library)}`} />
      <div className="p-6 mt-10">
        <Hydrate.Posts
          data={data}
          error={fetchError}
          isLoading={isLoading}
          refetch={refetch}
          isRefetching={isRefetching}
        />
      </div>
    </FadedLayout>
  );
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  const query = (ctx.params || '') as unknown as {
    library?: string[];
  };

  return {
    props: { query },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = () =>
  Promise.resolve({ paths: [], fallback: 'blocking' });
