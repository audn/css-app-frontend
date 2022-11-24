import { NextSeo } from 'next-seo';
import { Hydrate } from '../common/components/Hydrate';
import { FadedLayout } from '../common/layouts/FadeLayout';
import { useAllPosts } from '../common/utils/hooks/posts';

export default function Home() {
  const {
    data,
    isLoading,
    error: fetchError,
    refetch,
    isRefetching,
  } = useAllPosts();

  return (
    <FadedLayout
      h1="Library for hand-crafted components"
      h3=" Guides, Product Updates and Research from Senja"
    >
      <NextSeo />
      <div className="mt-12">
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
