import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Hydrate } from '../common/components/Hydrate';
import { FadedLayout } from '../common/layouts/FadeLayout';
import { API } from '../common/lib/interfaces';
import useAuthState from '../common/store/auth';
import { useSearchPosts } from '../common/utils/hooks/posts';

export default function Home() {
  const router = useRouter();

  const user = useAuthState((s) => s.user);
  const library = user.preferences?.preferredLibrary || 'TailwindCSS';
  const query: API.Requests.SearchPosts = {
    q: (router.query.q as string) || '*',
    filter: {
      library: library.toLowerCase(),
    },
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
      h1={
        <>
          A free library for hand-crafted components using{' '}
          <span className="text-brand-primary-150">{library}</span>
        </>
      }
      h3="Guides, Patch Notes and a warm community surrounding all CSS libraries. "
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
