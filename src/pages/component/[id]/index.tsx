import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../../common/components/Buttons';
import Auth from '../../../common/components/layout/Auth';
import Link from '../../../common/components/layout/Link';
import PenEditor from '../../../common/components/layout/Pen/Editor';
import Preview from '../../../common/components/layout/Pen/Preview';
import { DefaultLayout } from '../../../common/layouts/Default';
import { API } from '../../../common/lib/interfaces';
import EditModal from '../../../common/pages/pen/components/EditModal';
import InfoTag from '../../../common/pages/pen/components/InfoTag';
import useAuthState from '../../../common/store/auth';
import toDate from '../../../common/utils/helpers/toDate';
import {
  deleteComponent,
  getComponentFromId,
} from '../../../common/utils/hooks/api/components';

function Post({ post }: { post: API.Models.Component }) {
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

  const router = useRouter();
  const user = useAuthState((s) => s.user);

  const [showToggle, setShowToggle] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const [isEditing, setEdit] = useState<boolean>(false);

  const toggleEdit = () => setEdit(!isEditing);
  const simpleInfo = [
    {
      label: 'Library',
      value: (
        <>
          <img src={`/libraries/${library}.svg`} className="w-5 h-5 mr-2" />{' '}
          {library}@{libraryVersion}
        </>
      ),
      icon: 'fa-regular fa-at',
    },
    {
      label: 'Animated',
      value:
        JSON.stringify(animated) !== 'null' ? (
          <i className="text-green-500 fa-solid fa-check" />
        ) : (
          <i className="text-red-500 fa-solid fa-times" />
        ),
      icon: 'fa-regular fa-circle-play',
    },
    {
      label: 'Responsive',
      value:
        JSON.stringify(responsive) !== 'null' ? (
          <i className="text-green-500 fa-solid fa-check" />
        ) : (
          <i className="text-red-500 fa-solid fa-times" />
        ),
      icon: 'fa-regular fa-up-right-and-down-left-from-center',
    },
    {
      label: 'Theme',
      value: theme || 'Dark',
      icon: 'fa-regular fa-eye',
    },
    {
      label: 'Author',
      value: (
        <>
          <img src={author.avatar} className="w-5 h-5 mr-2 rounded-full" />
          <Link
            href={`/user/${author.id}`}
            className="hover:text-white animate"
          >
            {' '}
            <h3>{author?.username}</h3>
          </Link>
        </>
      ),
      icon: 'fa-regular fa-user',
    },
    {
      label: 'Added',
      value: toDate({
        dateString: String(new Date(post.createdAt)),
        options: {
          show: { month: 'short', day: '2-digit', year: 'numeric' },
        },
      }),
      icon: 'fa-regular fa-calendar',
    },
  ];
  async function onDelete() {
    if (!warning) {
      setWarning(true);
    } else {
      const msg = toast.loading('Deleting...');
      const deleted = await deleteComponent(post.id);
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

  //   const onRefreshThumbnail = async () => {
  //     const msg = toast.loading('Refreshing...');
  //     const updated = await useGenerateThumbnail(post.id);
  //     if (updated.payload?.results) {
  //       toast.success('Refreshed!', { id: msg });
  //     } else toast.error('Failed to refresh', { id: msg });
  //   };
  return (
    <DefaultLayout>
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
      <div className="space-y-12">
        <div className="grid items-start grid-cols-1 gap-5 xl:grid-cols-2">
          <div>
            <div
              className="relative h-[450px] rounded-lg overflow-hidden "
              onMouseEnter={() => {
                // if (!showToggle) {
                setShowToggle(true);
                // }
              }}
              onMouseLeave={() => setShowToggle(false)}
            >
              {showToggle && (
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="absolute z-50 flex items-center justify-center w-8 h-8 rounded-full bg-types-250 hover:text-white top-5 right-5"
                >
                  {darkMode ? (
                    <i className="fa-solid fa-moon" />
                  ) : (
                    <i className="fa-solid fa-sun-bright" />
                  )}
                </button>
              )}
              <Preview
                className={darkMode ? '!bg-[#121212]' : ''}
                initialCode={code}
                library={library}
                version={libraryVersion}
              />
            </div>
            <div className="flex items-center justify-between mt-5 space-x-3">
              <Button.Secondary
                icon="fa-brands fa-twitter"
                title="Share"
                className="!text-white !bg-blue-500"
                onClick={toggleEdit}
              />{' '}
              <div className="flex items-center">
                <Button.Wrapper>
                  {/* <Link href={`/component/${post.id}/preview`} target="_blank">
                    <Button.Secondary
                      icon="fa-regular fa-external-link"
                      title={
                        <span className="flex">
                          Fullscreen{' '}
                        </span>
                      }
                    />
                  </Link> */}
                  <Button.Secondary
                    icon="fa-regular fa-copy"
                    title="Fork"
                    onClick={toggleEdit}
                  />{' '}
                  <Button.Secondary
                    icon="fa-regular fa-bookmark"
                    title="Save"
                    onClick={toggleEdit}
                  />
                  <Auth.Policy policy={canManagePost()}>
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
                    {/* <Auth.Admin>
                      <Button.Secondary
                        icon="fa-regular fa-image"
                        title={'Refresh Thumbnail'}
                        onClick={onRefreshThumbnail}
                      />
                    </Auth.Admin> */}
                  </Auth.Policy>
                </Button.Wrapper>
              </div>
            </div>
          </div>
          <div>
            {simpleInfo.map((x) => (
              <InfoTag {...x} />
            ))}
          </div>

          <div className="xl:col-span-2 rounded-xl border border-types-150 py-3 overflow-hidden h-[450px] bg-types-50">
            <PenEditor
              templateCode={post.code}
              fullHeight={false}
              initialContent={post.code}
              // onChange={(val) => update('code', val)}
            />{' '}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Post;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = (ctx.params?.id || '') as string;

  const data = await getComponentFromId(id);
  1;
  if (data.error) {
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
