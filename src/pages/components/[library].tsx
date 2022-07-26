import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LibrarySelector from '../../common/components/Header/components/LibrarySelector';
import { Hydrate } from '../../common/components/Hydrate';
import H2 from '../../common/components/layout/headings/H2';
import { DefaultLayout } from '../../common/layouts/Default';
import useFilterState from '../../common/store/filter';
import { useLibraryLabel } from '../../common/utils/data/libraries';
import { useCategories } from '../../common/utils/hooks/categories';
import { useSearchPosts } from '../../common/utils/hooks/posts';

export default function Home({ query }: { query: { library: string } }) {
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
  } = useSearchPosts(apiQuery);
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
  } = useCategories(library!);

  const [distribution, setDistribution] = useState<any>(
    data?.payload?.distribution,
  );
  return (
    <DefaultLayout>
      <div className="flex flex-col mt-3 md:mt-8">
        <H2 className="text-white">{library} Components</H2>
        <h4 className="text-lg mt-3 !font-medium">
          Browsing components posted by community members.
        </h4>
        <div className="flex-col mt-5">
          <h3 className="flex mb-2 font-semibold sm:hidden text-on-100">
            Categories
          </h3>
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
        <div className="flex flex-col w-full mt-5 sm:hidden">
          <h3 className="mb-2 font-semibold text-on-100">Library</h3>
          <LibrarySelector
            className="w-full !py-2 text-base !font-medium"
            wrapperClassName="!max-w-[500px] !w-full mt-2"
          />
        </div>{' '}
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
