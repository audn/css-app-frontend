import { NextSeo } from 'next-seo';
import { Hydrate } from '../common/components/Hydrate';
import { FadedLayout } from '../common/layouts/FadeLayout';
import { API } from '../common/lib/interfaces';
import { useSearchPosts } from '../common/utils/hooks/posts';

export default function Home() {
  const query: API.Requests.SearchPosts = {
    q: '*',
    filter: { library: 'TailwindCSS' },
  };
  const {
    data,
    isLoading,
    error: fetchError,
    refetch,
    isRefetching,
  } = useSearchPosts(query);

  return (
    <FadedLayout
      h1="Library for hand-crafted components"
      h3=" Guides, Product Updates and Research from Senja"
    >
      <NextSeo />
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
