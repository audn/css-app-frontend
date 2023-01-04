import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Preview from '../../../common/components/layout/Pen/Preview';
import { API } from '../../../common/lib/interfaces';
import { getComponentFromId } from '../../../common/utils/hooks/api/components';

function PostPreview({ post }: { post: API.Models.Component }) {
  //   const router = useRouter();
  return (
    <div>
      <NextSeo title={post.title} />
      <Preview
        type="component"
        initialCode={post.code}
        library={post.library}
        version={post.libraryVersion}
      />
      {/* <div className="fixed bottom-0 z-50 justify-center w-full p-4 tex-twhite bg-types-100">
        <div className="grid grid-cols-3">
          <div className="flex items-start">
            <Link href={router.asPath.replace('/preview', '')}>
              <Button.Secondary title="&larr; Go back" />{' '}
            </Link>
          </div>
          <div className="flex items-center justify-center">
            Preview of&nbsp;<div className="font-semibold">{post.title}</div>
          </div>
          <div></div>
        </div>
      </div> */}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = (ctx.params?.id || '') as string;

  const data = await getComponentFromId(id);

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
