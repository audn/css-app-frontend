import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Text from '../../../common/components/layout/headings/Text';
import Link from '../../../common/components/layout/Link';
import Tooltip from '../../../common/components/layout/Tooltip';
import Preview from '../../../common/components/Pen/Preview';
import { DefaultLayout } from '../../../common/layouts/Default';
import { API } from '../../../common/lib/interfaces';
import concat from '../../../common/utils/helpers/concat';
import {
  deletePost,
  getPostFromId,
} from '../../../common/utils/hooks/api/posts';

function Post({ post }: { post: API.Models.Post }) {
  const router = useRouter();
  const [warning, setWarning] = useState<boolean>(false);
  async function onDelete() {
    if (!warning) {
      setWarning(true);
    } else {
      const deleted = await deletePost(post.id);
      if (!deleted.error) {
        router.push('/');
        toast.success('Deleted');
      }
    }
  }
  const {
    author,
    description,
    responsive,
    id,
    library,
    code,
    animated,
    category,
    theme,
    title,
    generatedImage,
  } = post;
  return (
    <DefaultLayout>
      <NextSeo title={title} />
      {/* tailwindcss@2.0.2 */}
      <div className="space-y-12 mt-[95px]">
        <div className="flex flex-col">
          <div className="flex items-center">
            <h1 className="mr-3 text-2xl font-semibold text-white">{title}</h1>
            <Tooltip id="delete" text="Delete pen">
              <button
                onClick={onDelete}
                className={concat(
                  warning
                    ? 'bg-orange-500 bg-opacity-20 text-orange-500 px-3 py-[0.3rem] rounded-full text-xs'
                    : 'bg-types-200  w-7 h-7 ',
                  'flex items-center justify-center rounded-full',
                )}
              >
                {warning ? (
                  'Are you sure?'
                ) : (
                  <i className="text-xs fa-solid fa-trash-alt" />
                )}
              </button>
            </Tooltip>
          </div>{' '}
          <div className="mt-2">
            <Text>{description}</Text>
          </div>
          <div className="flex items-center mt-5">
            <img src={author.avatar} className="w-6 h-6 mr-2 rounded-full" />
            <Link
              href={`/user/${author.id}`}
              className="hover:text-white animate"
            >
              <h3>{author?.username}</h3>
            </Link>
          </div>
        </div>

        <div className="relative h-screen rounded-lg bg-types-100">
          <Preview code={code} />
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center font-medium">
            <div className="w-60">
              <i className="mr-2 fa-regular fa-clock" />
              Updated date
            </div>
            2d ago
          </div>
          <div className="flex items-center font-medium">
            <div className="w-60">
              <i className="mr-2 fa-regular fa-circle-play" />
              Animated
            </div>
            <div className="text-on-50"> {JSON.stringify(animated)}</div>
          </div>
          <div className="flex items-center font-medium">
            <div className="w-60">
              <i className="mr-2 fa-regular fa-up-right-and-down-left-from-center" />
              Responsive
            </div>
            {JSON.stringify(responsive)}
          </div>
          <div className="flex items-center font-medium">
            <div className="w-60">
              <i className="mr-2 fa-regular fa-eye" />
              Theme
            </div>
            {theme}
          </div>
        </div>
      </div>
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
