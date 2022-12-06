import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../../common/components/Buttons';
import Auth from '../../../common/components/layout/Auth';
import Text from '../../../common/components/layout/headings/Text';
import Link from '../../../common/components/layout/Link';
import PenEditor from '../../../common/components/Pen/Editor';
import Preview from '../../../common/components/Pen/Preview';
import { DefaultLayout } from '../../../common/layouts/Default';
import { API } from '../../../common/lib/interfaces';
import EditModal from '../../../common/pages/pen/components/EditModal';
import InfoTag from '../../../common/pages/pen/components/InfoTag';
import useAuthState from '../../../common/store/auth';
import {
  deletePost,
  getPostFromId,
} from '../../../common/utils/hooks/api/posts';

function Post({ post }: { post: API.Models.Post }) {
  const router = useRouter();
  const user = useAuthState((s) => s.user);

  const [seeCode, setSeeCode] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const [isEditing, setEdit] = useState<boolean>(false);

  useEffect(() => {
    async function updateThumbnail() {
      if (post.generatedImage == null) {
        const msg = toast.loading('Generating thumbnail...');
        let options: RequestInit = {
          method: 'PUT',
          mode: 'cors',
          referrerPolicy: 'no-referrer',
          credentials: 'omit',
        };

        const data = await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/post/thumb?id=${post?.id}`,
          options,
        );
        const res = await data.json();

        if (!res.errorMessage) {
          toast.success('Done!', { id: msg });
        } else {
          toast.error(res.errorMessage, { id: msg });
        }
      }
    }
    updateThumbnail();
  }, []);

  const toggleEdit = () => setEdit(!isEditing);

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
    // createdAt,
    title,
  } = post;

  return (
    <DefaultLayout className="!max-w-7xl">
      <NextSeo title={title} />
      <EditModal isOpen={isEditing} onClose={toggleEdit} post={post} />
      <div className="mt-8 space-y-12">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <img
                src={author.avatar}
                className="w-12 h-12 mr-3 rounded-full"
              />

              <div className="flex flex-col justify-center">
                <h1 className="mr-3 text-xl font-semibold text-white">
                  {title}
                </h1>
                <Link
                  href={`/user/${author.id}`}
                  className="hover:text-white animate"
                >
                  {' '}
                  <h3>{author?.username}</h3>
                </Link>
              </div>
            </div>
            {description && (
              <div className="max-w-3xl mt-5 leading-relaxed">
                <Text>{description}</Text>
              </div>
            )}
            <Auth.Policy policy={canManagePost()}>
              <div className="flex items-center mt-5">
                <Button.Wrapper>
                  <Button.Secondary
                    icon="fa-regular fa-pen-to-square"
                    title="Edit"
                    onClick={toggleEdit}
                  />
                  <Button.Secondary
                    icon="fa-regular fa-trash-alt"
                    title={warning ? 'Are you sure?' : 'Delete'}
                    onClick={onDelete}
                  />
                </Button.Wrapper>
              </div>
            </Auth.Policy>
          </div>
        </div>
        <div className="relative overflow-hidden border rounded-lg border-types-200">
          <div className="relative z-10 flex justify-between px-5 py-5 bg-types-body">
            <Button.Wrapper>
              <Link href={`/component/${post.id}/preview`} target="_blank">
                <Button.Secondary
                  icon="fa-regular fa-external-link"
                  title="Fullscreen Preview"
                />
              </Link>
              <Button.Secondary
                icon="fa-regular fa-code"
                title="Show code"
                onClick={() => setSeeCode(!seeCode)}
              />
            </Button.Wrapper>
          </div>
          <div className="relative h-[600px] border border-types-200">
            {seeCode ? (
              <PenEditor
                templateCode={post.code}
                initialContent={post.code}
                // onChange={(val) => update('code', val)}
              />
            ) : (
              <Preview
                initialCode={code}
                library={library}
                version={libraryVersion}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <InfoTag
            title="Library"
            text={`${library}@${libraryVersion}`}
            icon="fa-regular fa-at"
          />
          {/* <InfoTag
              title="Posted"
              text={createdAt}
              icon="fa-regular fa-clock"
            /> */}
          <InfoTag
            title="Animated"
            text={JSON.stringify(animated) == 'null' ? 'False' : 'Yes'}
            icon="fa-regular fa-circle-play"
          />
          <InfoTag
            title="Responsive"
            text={JSON.stringify(responsive) ? 'Yes' : 'No'}
            icon="fa-regular fa-up-right-and-down-left-from-center"
          />
          <InfoTag title="Theme" text={theme} icon="fa-regular fa-eye" />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Post;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = (ctx.params?.id || '') as string;

  const data = await (await getPostFromId(id)).payload?.results;

  if (!data) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
  return {
    props: { post: data },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = () =>
  Promise.resolve({ paths: [], fallback: 'blocking' });
