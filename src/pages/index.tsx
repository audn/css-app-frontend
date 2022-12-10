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
      h1={<>Library for hand-crafted components</>}
      h3="Guides, Patch Notes and a warm community surrounding all CSS libraries. "
    >
      <NextSeo />
      <div className="px-5">
        <div className="flex flex-col mt-10 mb-10">
          <h2 className="!text-on-100 !text-lg font-semibold">
            Recently posted components
          </h2>
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
      </div>
    </FadedLayout>
  );
}
