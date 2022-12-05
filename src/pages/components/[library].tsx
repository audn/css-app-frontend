import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Hydrate } from '../../common/components/Hydrate';
import H2 from '../../common/components/layout/headings/H2';
import { DefaultLayout } from '../../common/layouts/Default';
import useFilterState from '../../common/store/filter';
import { useLibraryLabel } from '../../common/utils/data/libraries';
import { useSearchPosts } from '../../common/utils/hooks/posts';

export default function Home({ query }: { query: { library: string } }) {
  const router = useRouter();
  const filters = useFilterState();

  const initialLibrary = query.library;
  const [library, setLibrary] = useState<string | undefined>(
    useLibraryLabel(initialLibrary),
  );

  useEffect(() => {
    setLibrary(filters.library);
  }, [filters.library]);

  useEffect(() => {
    if (initialLibrary) {
      useFilterState.setState({ library: useLibraryLabel(initialLibrary) });
    }
  }, [initialLibrary]);

  const setDefaultLibrary = () => {
    useFilterState.setState({ library: 'TailwindCSS' });
  };

  const resetQueries = () => {
    setDefaultLibrary();
    router.push(`/components/tailwindcss`, undefined, {
      shallow: true,
    });
    toast.success('Reset back to default filters.');
  };

  const apiQuery = {
    q: (router.query.q as string) || '*',
    filter: {
      library: filters.library.toLowerCase(),
    },
  };

  const {
    data,
    isLoading,
    error: fetchError,
    refetch,
    isRefetching,
  } = useSearchPosts(apiQuery);

  return (
    <DefaultLayout>
      <div className="flex flex-col mt-3 md:mt-8">
        <H2 className="text-white">{library} Components</H2>
        <h4 className="text-lg mt-3 !font-medium">
          Browsing components posted by community members.
        </h4>
      </div>
      <NextSeo title={`Browse components for ${library}`} />
      <div className="mt-10 ">
        <Hydrate.Posts
          data={data}
          error={fetchError}
          isLoading={isLoading}
          refetch={refetch}
          isRefetching={isRefetching}
          onClearFilters={resetQueries}
        />
      </div>
    </DefaultLayout>
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
