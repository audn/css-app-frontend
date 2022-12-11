import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../../common/components/Buttons';
import Dropdown from '../../../common/components/Dropdown';
import Auth from '../../../common/components/layout/Auth';
import Text from '../../../common/components/layout/headings/Text';
import Link from '../../../common/components/layout/Link';
import PenEditor from '../../../common/components/layout/Pen/Editor';
import Preview from '../../../common/components/layout/Pen/Preview';
import { DefaultLayout } from '../../../common/layouts/Default';
import { API } from '../../../common/lib/interfaces';
import { INavItem } from '../../../common/lib/types';
import EditModal from '../../../common/pages/pen/components/EditModal';
import InfoTag from '../../../common/pages/pen/components/InfoTag';
import useAuthState from '../../../common/store/auth';
import { useLocalhost } from '../../../common/utils/helpers/useOnLocal';
import {
  deletePost,
  getPostFromId,
  uploadThumbnail,
} from '../../../common/utils/hooks/api/posts';

function Post({ post }: { post: API.Models.Post }) {
  const router = useRouter();
  const user = useAuthState((s) => s.user);

  const [seeCode, setSeeCode] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const [isEditing, setEdit] = useState<boolean>(false);

  useEffect(() => {
    async function updateThumbnail() {
      if (post.generatedImage == null && useLocalhost) {
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
        await uploadThumbnail(post.id, res);
      }
    }
    updateThumbnail();
  }, []);

  const toggleEdit = () => setEdit(!isEditing);

  async function onDelete() {
    if (!warning) {
      setWarning(true);
    } else {
      const msg = toast.loading('Deleting...');
      const deleted = await deletePost(post.id);
      if (!deleted.error) {
        router.push('/');
        toast.success('Deleted', { id: msg });
      } else {
        toast.error('Failed to delete', { id: msg });
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
  const dropdownList = [
    {
      label: 'Edit',
      icon: 'fa-regular fa-pen-to-square',
      onClick: () => setEdit(!isEditing),
    },
    {
      label: 'Edit code',
      icon: 'fa-regular fa-code',
      route: `/component/${post.id}/edit`,
    },
    {
      label: warning ? 'Are you sure?' : 'Delete component',
      onClick: () => onDelete(),
      icon: 'fa-regular fa-trash-can',
      className: 'hover:!bg-red-500 hover:!bg-opacity-10 hover:text-red-500',
    },
  ] as INavItem[];
  return (
    <DefaultLayout className="!max-w-7xl">
      <NextSeo
        title={title}
        openGraph={{
          url: `https://css.app/component/${post.id}`,
          images: [
            {
              url: post.generatedImage!,
              height: 1080,
              width: 1920,
              alt: `${post.title}`,
              type: 'image/jpeg',
            },
          ],
        }}
        twitter={{
          cardType: 'summary',
        }}
        description={post.description}
      />
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
              <div className="items-center hidden mt-5 sm:flex">
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
          <Auth.Policy policy={canManagePost()}>
            <Dropdown
              list={dropdownList}
              className="sm:hidden"
              options={{ caret: false, position: 'end' }}
            >
              <button className="flex items-center justify-center w-8 h-8 text-lg rounded-full bg-types-200 text-on-50 hover:bg-types-200 hover:text-white animate">
                <i className="fa-solid fa-ellipsis-vertical" />
              </button>
            </Dropdown>
          </Auth.Policy>
        </div>
        <div className="relative overflow-hidden border rounded-lg border-types-200">
          <div className="relative z-10 flex justify-between px-5 py-5 bg-types-body">
            <Button.Wrapper>
              <Link href={`/component/${post.id}/preview`} target="_blank">
                <Button.Secondary
                  icon="fa-regular fa-external-link"
                  title={
                    <span className="flex">
                      Fullscreen{' '}
                      <span className="hidden sm:flex">&nbsp;preview</span>
                    </span>
                  }
                />
              </Link>
              <Button.Secondary
                icon="fa-regular fa-code"
                title="Show code"
                onClick={() => setSeeCode(!seeCode)}
              />
            </Button.Wrapper>
            <Auth.Policy policy={canManagePost()}>
              <Link
                href={`/component/${post.id}/edit`}
                className="hidden sm:flex"
              >
                <Button.Secondary
                  icon="fa-regular fa-pen-to-square"
                  title="Edit code"
                />
              </Link>
            </Auth.Policy>
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
