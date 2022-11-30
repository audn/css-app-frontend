import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Auth from '../../common/components/layout/Auth';
import Text from '../../common/components/layout/headings/Text';
import Link from '../../common/components/layout/Link';
import Tooltip from '../../common/components/layout/Tooltip';
import Preview from '../../common/components/Pen/Preview';
import { DefaultLayout } from '../../common/layouts/Default';
import { API } from '../../common/lib/interfaces';
import EditModal from '../../common/pages/pen/components/EditModal';
import useAuthState from '../../common/store/auth';
import concat from '../../common/utils/helpers/concat';
import { deletePost, getPostFromId } from '../../common/utils/hooks/api/posts';

function Post({ post }: { post: API.Models.Post }) {
  const router = useRouter();
  const user = useAuthState((s) => s.user);

  const [warning, setWarning] = useState<boolean>(false);
  const [isEditing, setEdit] = useState<boolean>(false);

  const postCss = post.libraryRelations?.versions.find(
    (x) => x.value === post.libraryVersion,
  )?.src;

  const toggleEdit = () => setEdit(false);

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
  const canManagePost = () => {
    return user.id == post.authorId || user.role === 'ADMIN';
  };

  const {
    author,
    description,
    responsive,
    code,
    animated,
    theme,
    library,
    libraryVersion,
    createdAt,
    title,
  } = post;
  return (
    <DefaultLayout>
      <NextSeo title={title} />
      <EditModal isOpen={isEditing} onClose={toggleEdit} post={post} />
      <div className="mt-8 space-y-12">
        <div className="flex flex-col">
          <h4 className="mb-3 text-white/50">
            {library}@{libraryVersion}
          </h4>{' '}
          <div className="flex items-center">
            <h1 className="mr-3 text-2xl font-bold text-white">{title}</h1>
            <div className="flex space-x-2">
              <Auth.Policy policy={canManagePost()}>
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
                <Tooltip id="edit" text="Edit pen">
                  <button
                    onClick={() => setEdit(true)}
                    className={
                      'flex items-center justify-center rounded-full w-7 h-7 bg-types-200'
                    }
                  >
                    <i className="text-xs fa-solid fa-pen-to-square" />
                  </button>
                </Tooltip>
              </Auth.Policy>
            </div>
          </div>
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
          <Preview code={code} link={postCss!} />
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center font-medium">
            <div className="w-60">
              <i className="mr-2 fa-regular fa-clock" />
              Posted
            </div>
            {createdAt}
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
