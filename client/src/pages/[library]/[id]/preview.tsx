import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Button } from '../../../common/components/Buttons';
import Preview from '../../../common/components/Pen/Preview';
import { API } from '../../../common/lib/interfaces';
import { getPostFromId } from '../../../common/utils/hooks/api/posts';

function PostPreview({ post }: { post: API.Models.Post }) {
  const postCss = post.libraryRelations?.versions.find(
    (x) => x.value === post.libraryVersion,
  )?.src;
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <NextSeo title={post.title} />
      <Preview code={post.code} link={postCss!} />
      <div className="fixed bottom-0 z-50 justify-center w-full p-4 tex-twhite bg-types-100">
        <div className="grid grid-cols-3">
          <div className="flex items-start">
            <Button.Secondary
              title="&larr; Go back"
              route={router.asPath.replace('/preview', '')}
            />{' '}
          </div>
          <div className="flex items-center justify-center">
            Preview of&nbsp;<div className="font-semibold">{post.title}</div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

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

export default PostPreview;
