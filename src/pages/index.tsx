import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { Hydrate } from '../common/components/Hydrate';
import { DefaultLayout } from '../common/layouts/Default';
import { useLibraryLabel } from '../common/utils/data/libraries';
import { useCategories } from '../common/utils/hooks/categories';
import { useAllPosts } from '../common/utils/hooks/posts';

export default function Home() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const initialLibrary = 'tailwindcss';

  const [library, setLibrary] = useState<string | undefined>(
    useLibraryLabel(initialLibrary),
  );
  const updateCategories = (val: string) => {
    if (!selectedValues.includes(val)) {
      setSelectedValues([...selectedValues, val]);
    } else {
      selectedValues.splice(selectedValues.indexOf(val), 1);
      setSelectedValues([...selectedValues]);
    }
  };
  const {
    data,
    isLoading,
    error: fetchError,
    refetch,
    isRefetching,
  } = useAllPosts();

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

  useEffect(() => {
    if (data?.payload?.distribution)
      setDistribution(data?.payload?.distribution);
  }, [data]);

  return (
    <DefaultLayout>
      <NextSeo />

      <div className="flex flex-col">
        <h1 className="mb-10 text-2xl font-semibold text-white">Components</h1>
        <Hydrate.Categories
          data={categories}
          distribution={distribution}
          error={fetchCategoriesError}
          selectedValues={selectedValues}
          setSelectedValues={updateCategories}
          isLoading={isLoadingCategories}
          refetch={refetchCategories}
          isRefetching={isRefetchingCategories}
        />
        {/* <h4 className="text-lg mt-3 !font-medium">
          Browsing components posted by community members.
        </h4> */}
      </div>
      <Hydrate.Posts
        data={data}
        error={fetchError}
        isLoading={isLoading}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    </DefaultLayout>
  );
}
