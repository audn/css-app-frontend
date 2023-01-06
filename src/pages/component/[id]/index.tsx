import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import { Button } from '../../../common/components/Buttons';
import Dropdown from '../../../common/components/Dropdown';
import Auth from '../../../common/components/layout/Auth';
import Link from '../../../common/components/layout/Link';
import PenEditor from '../../../common/components/layout/Pen/Editor';
import Preview from '../../../common/components/layout/Pen/Preview';
import { DefaultLayout } from '../../../common/layouts/Default';
import { API } from '../../../common/lib/interfaces';
import { INavItem } from '../../../common/lib/types';
import EditModal from '../../../common/pages/pen/components/EditModal';
import InfoTag from '../../../common/pages/pen/components/InfoTag';
import useAuthState from '../../../common/store/auth';
import { useLibraryLabel } from '../../../common/utils/data/libraries';
import concat from '../../../common/utils/helpers/concat';
import toDate from '../../../common/utils/helpers/toDate';
import {
  bookmarkComponent,
  deleteComponent,
  getComponentFromId,
  likeComponent,
} from '../../../common/utils/hooks/api/components';
import useGenerateThumbnail from '../../../common/utils/useGenerateThumbnail';

function Component({ component }: { component: API.Models.Component }) {
  const {
    author,
    // description,
    responsive,
    code,
    likes,
    saves,
    animated,
    theme,
    library,
    libraryVersion,
    createdAt,
    title,
  } = component;

  const router = useRouter();
  const user = useAuthState((s) => s.user);

  const [showToggle, setShowToggle] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const [isEditing, setEdit] = useState<boolean>(false);

  const [isLikingComponent, setIsLikingComponent] = useState<boolean>(false);
  const [isComponentLiked, setIsComponentLiked] = useState<boolean>(false);

  const [isSavingComponent, setisSavingComponent] = useState<boolean>(false);
  const [isComponentSaved, setIsComponentSaved] = useState<boolean>(false);

  const toggleEdit = () => setEdit(!isEditing);
  const simpleInfo = [
    {
      label: 'Library',
      value: (
        <>
          <img
            src={`/libraries/${library.toLowerCase()}.svg`}
            className="w-5 h-5 mr-2"
          />
          {useLibraryLabel(library)}{' '}
          {library !== 'css3' && `@${libraryVersion}`}
        </>
      ),
      icon: 'fa-regular fa-at',
    },
    {
      label: 'Animated',
      value: animated ? (
        <i className="text-green-500 fa-solid fa-check" />
      ) : (
        <i className="text-red-500 fa-solid fa-times" />
      ),
      icon: 'fa-regular fa-circle-play',
    },
    {
      label: 'Responsive',
      value: responsive ? (
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
      label: 'Likes',
      value: likes.length,
      icon: 'fa-regular fa-heart',
    },
    {
      label: 'Saves',
      value: saves.length,
      icon: 'fa-regular fa-bookmark',
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
        dateString: String(new Date(createdAt)),
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
      const deleted = await deleteComponent(component.id);
      if (!deleted.error) {
        router.push('/');
        toast.success('Deleted', { id: msg });
      } else {
        toast.error('Failed to delete', { id: msg });
      }
    }
  }
  useEffect(() => {
    likes.forEach((x) => {
      if (x.userId == user.id) {
        setIsComponentLiked(true);
      }
    });
    saves.forEach((x) => {
      if (x.userId == user.id) {
        setIsComponentSaved(true);
      }
    });
  }, [user]);

  const canManagePost = () => {
    return user.id == component.authorId || user.role === 'ADMIN';
  };

  async function handleLikeComponent() {
    setIsLikingComponent(true);
    const { error } = await likeComponent(component.id);
    if (!error) {
      setIsComponentLiked(!isComponentLiked);
    }
    setIsLikingComponent(false);
  }
  async function handleSaveComponent() {
    setisSavingComponent(true);
    const { error } = await bookmarkComponent(component.id);
    if (!error) {
      setIsComponentSaved(!isComponentSaved);
    }
    setisSavingComponent(false);
  }

  const onRefreshThumbnail = async () => {
    const msg = toast.loading('Refreshing...');
    const updated = await useGenerateThumbnail('component', component.id);
    if (updated.payload?.results) {
      toast.success('Refreshed!', { id: msg });
    } else toast.error('Failed to refresh', { id: msg });
  };

  const dropdownList = [
    {
      label: 'Edit Information',
      icon: 'fa-regular fa-pen-to-square',
      onClick: () => setEdit(!isEditing),
    },
    {
      label: 'Edit code',
      icon: 'fa-regular fa-code',
      route: `/component/${component.id}/edit`,
    },
    {
      label: warning ? 'Are you sure?' : 'Delete component',
      onClick: () => onDelete(),
      icon: 'fa-regular fa-trash-can',
      className: 'hover:!bg-red-500 hover:!bg-opacity-10 hover:text-red-500',
    },
  ] as INavItem[];

  return (
    <DefaultLayout>
      <div className="flex flex-col mb-5 space-y-4">
        <div className="flex">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center mr-2 rounded-full w-7 h-7 text-white/50 bg-types-150/50"
          >
            <i className="text-sm fa-regular fa-arrow-left" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-medium text-white">{component.title}</h1>
          <Auth.Policy policy={canManagePost()}>
            <Dropdown
              list={dropdownList}
              className="z-50"
              options={{ caret: false, position: 'start' }}
            >
              <button className="flex items-center justify-center w-6 h-6 text-lg rounded-full bg-types-150 text-on-50 hover:bg-types-200 hover:text-white animate">
                <i className="text-sm fa-solid fa-ellipsis-vertical" />
              </button>
            </Dropdown>
          </Auth.Policy>
        </div>
      </div>
      <NextSeo
        title={title}
        openGraph={{
          url: `https://css.app/component/${component.id}`,
          images: [
            {
              url: component.generatedImage!,
              height: 1080,
              width: 1920,
              alt: `${component.title}`,
              type: 'image/jpeg',
            },
          ],
        }}
        twitter={{
          cardType: 'summary',
        }}
        description={component.description}
      />
      <EditModal
        isOpen={isEditing}
        onClose={toggleEdit}
        component={component}
      />
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
                type="component"
                className={darkMode ? '!bg-[#121212]' : ''}
                initialCode={code}
                library={library}
                version={libraryVersion}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between mt-5 space-y-3 gap-x-3 ">
              <Button.Secondary
                icon="fa-brands fa-twitter"
                title="Share"
                className="!text-white !bg-blue-500"
                onClick={toggleEdit}
              />{' '}
              <div className="flex items-center">
                <Button.Wrapper>
                  {/* <Link href={`/component/${component.id}/preview`} target="_blank">
                    <Button.Secondary
                      icon="fa-regular fa-external-link"
                      title={
                        <span className="flex">
                          Fullscreen{' '}
                        </span>
                      }
                    />
                  </Link> */}
                  {/* <Button.Secondary
                    icon="fa-regular fa-copy"
                    title="Fork"
                    onClick={toggleEdit}
                  /> */}
                  <Auth.User>
                    <>
                      <Button.Secondary
                        className={concat(
                          isComponentLiked
                            ? '!bg-red-500/20 !text-red-500 !border-red-500/30'
                            : '',
                          '',
                        )}
                        icon={concat(
                          isComponentLiked
                            ? 'fa-solid fa-heart text-red-500'
                            : 'fa-regular fa-heart',
                        )}
                        onClick={handleLikeComponent}
                        title={
                          isComponentLiked ? (
                            'Liked'
                          ) : isLikingComponent ? (
                            <LoaderIcon />
                          ) : (
                            'Like'
                          )
                        }
                      />
                      <Button.Secondary
                        icon={concat(
                          isComponentSaved
                            ? 'fa-solid fa-bookmark text-white'
                            : 'fa-regular fa-bookmark',
                        )}
                        onClick={handleSaveComponent}
                        title={
                          isComponentSaved ? (
                            'Saved'
                          ) : isSavingComponent ? (
                            <LoaderIcon />
                          ) : (
                            'Save'
                          )
                        }
                      />
                    </>
                  </Auth.User>
                  <Auth.Admin>
                    <Button.Secondary
                      onClick={onRefreshThumbnail}
                      icon="fa-regular fa-image"
                      title={'Refresh thumbnail'}
                    />
                  </Auth.Admin>
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
              templateCode={component.code}
              fullHeight={false}
              initialContent={component.code}
              // onChange={(val) => update('code', val)}
            />{' '}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Component;

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
    props: { component: data.payload?.results },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = () =>
  Promise.resolve({ paths: [], fallback: 'blocking' });
