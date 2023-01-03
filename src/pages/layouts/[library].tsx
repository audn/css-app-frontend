import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LibrarySelector from '../../common/components/Header/components/LibrarySelector';
import { Hydrate } from '../../common/components/Hydrate';
import { DefaultLayout } from '../../common/layouts/Default';
import useFilterState from '../../common/store/filter';
import { useLibraryLabel } from '../../common/utils/data/libraries';
import { useCategories } from '../../common/utils/hooks/categories';
import { useSearchPages } from '../../common/utils/hooks/pages';

export default function BrowsePages({ query }: { query: { library: string } }) {
  const router = useRouter();
  const filters = useFilterState();

  const initialLibrary = query.library;
  const [library, setLibrary] = useState<string | undefined>(
    useLibraryLabel(initialLibrary),
  );
  const tags = router.query.tags as string;

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleRouterChange = () => {
    if (selectedValues.length) {
      router.push(
        {
          query: {
            ...router.query,
            tags: selectedValues.join(' '),
          },
        },
        undefined,
        { shallow: true },
      );
    } else router.push(router.asPath.split('?')[0]);
  };
  const updateCategories = (val: string) => {
    if (!selectedValues.includes(val)) {
      setSelectedValues([...selectedValues, val]);
    } else {
      selectedValues.splice(selectedValues.indexOf(val), 1);
      setSelectedValues([...selectedValues]);
    }
  };

  useEffect(() => {
    if (tags) {
      setSelectedValues(tags.split(' '));
    }
  }, [router.isReady]);

  useEffect(() => {
    // if (selectedValues.length) {
    handleRouterChange();
    // }
  }, [selectedValues]);

  useEffect(() => {
    setLibrary(filters.library);
  }, [filters.library]);

  useEffect(() => {
    if (initialLibrary) {
      useFilterState.setState({ library: useLibraryLabel(initialLibrary) });
    }
  }, [initialLibrary]);

  const setDefaultLibrary = () => {
    useFilterState.setState({ library: 'TailwindCSS', version: '3.2.4' });
  };

  const resetQueries = () => {
    setDefaultLibrary();
    router.push(`/components/tailwindcss`, undefined, {
      shallow: true,
    });
    setSelectedValues([]);
    toast.success('Reset back to default filters.');
  };

  const apiQuery = {
    q: (router.query.q as string) || '*',
    filter: {
      ...(selectedValues.length && { categories: selectedValues }),
      library: filters.library.toLowerCase(),
    },
  };

  const {
    data,
    isLoading,
    error: fetchError,
    refetch,
    isRefetching,
  } = useSearchPages(apiQuery);

  useEffect(() => {
    if (data?.payload?.distribution)
      setDistribution(data?.payload?.distribution);
  }, [data]);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: fetchCategoriesError,
    refetch: refetchCategories,
    isRefetching: isRefetchingCategories,
  } = useCategories('pages');

  const [distribution, setDistribution] = useState<any>(
    data?.payload?.distribution,
  );
  console.log(data);

  return (
    <DefaultLayout>
      <NextSeo title={`Browse Landing Pages made with ${library}`} />
      <LibrarySelector />{' '}
      <h1 className="mt-5 mb-3 text-2xl font-semibold text-white">Layouts</h1>
      <h4 className="text-lg">Browsing pages posted by community members.</h4>
      <div className="flex-col mt-5">
        <Hydrate.Categories
          data={categories}
          distribution={distribution}
          error={fetchCategoriesError}
          selectedValues={selectedValues}
          setSelectedValues={updateCategories}
          isLoading={isLoadingCategories}
          refetch={refetchCategories}
          isRefetching={isRefetchingCategories}
          onClearFilters={resetQueries}
        />
      </div>
      <div className="mt-10">
        <Hydrate.Pages
          data={data?.payload?.results}
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
