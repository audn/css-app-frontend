import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Hydrate } from '../common/components/Hydrate';
import H2 from '../common/components/layout/headings/H2';
import { DefaultLayout } from '../common/layouts/Default';
import { useSearchPosts } from '../common/utils/hooks/posts';

export default function SearchPage() {
  const router = useRouter();

  const apiQuery = {
    q: (router.query.q as string) || '*',
    filter: {},
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
        <H2 className="text-white"> Components</H2>
        <h4 className="text-lg mt-3 !font-medium">
          Browsing components posted by community members.
        </h4>
      </div>
      <NextSeo title={`Browse components for `} />
      <div className="mt-10 ">
        <Hydrate.Posts
          data={data}
          error={fetchError}
          isLoading={isLoading}
          refetch={refetch}
          isRefetching={isRefetching}
        />
      </div>
    </DefaultLayout>
  );
}
