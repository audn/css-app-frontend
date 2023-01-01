import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../../common/components/Buttons';
import Auth from '../../../common/components/layout/Auth';
import PenEditor from '../../../common/components/layout/Pen/Editor';
import Preview from '../../../common/components/layout/Pen/Preview';
import { DefaultLayout } from '../../../common/layouts/Default';
import { API } from '../../../common/lib/interfaces';
import EditModal from '../../../common/pages/pen/components/EditModal';
import InfoTag from '../../../common/pages/pen/components/InfoTag';
import useAuthState from '../../../common/store/auth';
import {
  deletePost,
  getPostFromId,
} from '../../../common/utils/hooks/api/posts';
import useGenerateThumbnail from '../../../common/utils/useGenerateThumbnail';

function Post({ post }: { post: API.Models.Post }) {
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

  const [warning, setWarning] = useState<boolean>(false);
  const [isEditing, setEdit] = useState<boolean>(false);

  const toggleEdit = () => setEdit(!isEditing);
  const simpleInfo = [
    {
      label: 'Library',
      value: `${library}@${libraryVersion}`,
      icon: 'fa-regular fa-at',
    },
    {
      label: 'Animated',
      value: JSON.stringify(animated) == 'null' ? 'False' : 'Yes',
      icon: 'fa-regular fa-circle-play',
    },
    {
      label: 'Responsive',
      value: JSON.stringify(responsive) ? 'Yes' : 'No',
      icon: 'fa-regular fa-up-right-and-down-left-from-center',
    },
    {
      label: 'Theme',
      value: theme,
      icon: 'fa-regular fa-eye',
    },
  ];
  const statInfo = [
    {
      label: 'Views',
      value: 52,
      icon: 'fa-solid fa-eye',
    },
    {
      label: 'Comments',
      value: 5,
      icon: 'fa-solid fa-comment',
    },
  ];
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
  const onRefreshThumbnail = async () => {
    const msg = toast.loading('Refreshing...');
    const updated = await useGenerateThumbnail(post.id);
    if (updated.payload?.results) {
      toast.success('Refreshed!', { id: msg });
    } else toast.error('Failed to refresh', { id: msg });
  };
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
        <div className="grid items-start grid-cols-2 gap-5">
          <div className="col-span-1">
            <div className="relative h-[450px] rounded-lg overflow-hidden">
              <Preview
                initialCode={code}
                library={library}
                version={libraryVersion}
              />
            </div>
            <div className="flex items-center mt-5 space-x-3">
              <Button.Wrapper>
                <Button.Secondary
                  icon="fa-brands fa-twitter"
                  title="Share"
                  className="!text-white !bg-blue-500"
                  onClick={toggleEdit}
                />
              </Button.Wrapper>
              <Auth.Policy policy={canManagePost()}>
                <div className="flex items-center">
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
                    <Auth.Admin>
                      <Button.Secondary
                        icon="fa-regular fa-image"
                        title={'Refresh Thumbnail'}
                        onClick={onRefreshThumbnail}
                      />
                    </Auth.Admin>
                  </Button.Wrapper>
                </div>
              </Auth.Policy>
            </div>
          </div>
          <div>
            <div
            //   className="flex flex-col justify-start overflow-hidden border // bg-types-50 rounded-xl border-types-150"
            >
              {simpleInfo.map((x) => (
                <InfoTag {...x} />
              ))}
            </div>
            {/* <div className="flex items-center justify-start mt-5 space-x-10">
              {statInfo.map((x) => (
                <div className="flex flex-col items-center p-4">
                  <i className={concat('', x.icon)} />

                  <div className="flex flex-col items-center mt-2 text-sm ">
                    <h2 className="text-white text-[13px] font-medium md:font-normal md:text-base">
                      {x.value}
                    </h2>
                    <h3 className="text-sm text-on-50">{x.label}</h3>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
          {/* <div className="border border-types-150 rounded-xl  py-3 overflow-hidden h-[450px] bg-types-50">
            <PenEditor
              templateCode={post.code}
              fullHeight={false}
              initialContent={post.code}
              // onChange={(val) => update('code', val)}
            />
          </div> */}
          <div className="col-span-2 rounded-xl border border-types-150 py-3 overflow-hidden h-[450px] bg-types-50">
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

  const data = await getPostFromId(id);
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
