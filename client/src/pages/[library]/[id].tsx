import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Text from '../../common/components/layout/headings/Text';
import Link from '../../common/components/layout/Link';
import { DefaultLayout } from '../../common/layouts/Default';
import { API } from '../../common/lib/interfaces';
import { getPostFromId } from '../../common/utils/hooks/api/posts';

function Post({ post }: { post: API.Models.Post }) {
  const {
    animated,
    userId,
    description,
    id,
    library,
    theme,
    title,
    generatedImage,
  } = post;
  return (
    <DefaultLayout>
      <NextSeo title={title} />
      {/* tailwindcss@2.0.2 */}
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <div className="flex items-center mt-3">
        <img src={userId.avatar} className="w-6 h-6 mr-2 rounded-full" />
        <Link href={`/user/${userId.id}`} className="hover:text-white animate">
          <h3>{userId?.username}</h3>
        </Link>
      </div>
      <div className="mt-8">
        <Text>{description}</Text>
      </div>
      <div className="mt-12 bg-types-100 h-[500px] rounded-lg"></div>
    </DefaultLayout>
  );
}

export default Post;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = (ctx.params?.id || '') as string;

  const data = await getPostFromId(id);

  if (!data) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
  return {
    props: { post: data.payload?.results },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = () =>
  Promise.resolve({ paths: [], fallback: 'blocking' });
