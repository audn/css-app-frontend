import { NextSeo } from 'next-seo';
import { Button } from '../common/components/Buttons';
import { Hydrate } from '../common/components/Hydrate';
import Text from '../common/components/layout/headings/Text';
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
      <div className="flex flex-col items-center justify-center mx-auto mt-12 text-center md:mt-0 md:py-24 rounded-2xl ">
        Boilerplate for building web applications with React
        <Text className="max-w-2xl mt-8">
          <p>
            React template with pre-made components and helpers. <br />
            All components are built using TailwindCSS.
          </p>
          <p className="mt-5 font-semibold">No installations required.</p>
        </Text>
        <Button.Wrapper className="mt-10">
          <Button.Secondary title="GitHub" icon="fa-brands fa-github" />
        </Button.Wrapper>
      </div>

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
