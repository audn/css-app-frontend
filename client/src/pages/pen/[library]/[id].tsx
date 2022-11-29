import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../../common/components/Buttons';
import { Form } from '../../../common/components/Form';
import Text from '../../../common/components/layout/headings/Text';
import Link from '../../../common/components/layout/Link';
import Modal from '../../../common/components/layout/Modal';
import Tooltip from '../../../common/components/layout/Tooltip';
import Preview from '../../../common/components/Pen/Preview';
import { DefaultLayout } from '../../../common/layouts/Default';
import { API } from '../../../common/lib/interfaces';
import concat from '../../../common/utils/helpers/concat';
import {
  deletePost,
  editPost,
  getPostFromId,
} from '../../../common/utils/hooks/api/posts';

function Post({ post }: { post: API.Models.Post }) {
  const router = useRouter();
  const [warning, setWarning] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
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
  const { author, description, responsive, code, animated, theme, title } =
    post;

  const [data, setData] = useState<API.Models.Post>(post);
  const unsavedChanges = JSON.stringify(data) !== JSON.stringify(post);

  const update = (key: keyof API.Models.Post, value: string | boolean) => {
    setData((d) => ({
      ...d,
      [key]: value,
    }));
  };

  async function onSave() {
    const newData = (({ author, authorId, ...o }) => o)(data);

    const saved = await editPost(post.id, newData);
    if (!saved.error) {
      toast.success('Saved');
      post = data;
      setEdit(false);
    } else {
      toast.error('Failed to update');
    }
  }

  return (
    <DefaultLayout>
      <NextSeo title={title} />
      {/* tailwindcss@2.0.2 */}
      <Modal onClose={() => setEdit(false)} open={edit}>
        <React.Fragment>
          <h1 className="text-xl font-bold text-center text-white">Edit pen</h1>
          <Form.Wrapper column={true} className="w-full mt-5 space-y-5">
            <div className="flex flex-col w-full">
              <h3 className="mb-2 font-medium text-[14px]">Title</h3>
              <Form.Input
                placeholder={post.title}
                value={data.title}
                onChange={(val) => update('title', val)}
                id="name"
                inputClassName="px-4 py-4 bg-types-100/20 border border-types-250"
              />
            </div>
            <div className="flex flex-col w-full">
              <h3 className="mb-2 font-medium text-[14px]">Description</h3>
              <Form.Textarea
                placeholder={post.description}
                value={data.description}
                onChange={(val) => update('description', val)}
                id="description"
                inputClassName="px-4 py-4 bg-types-100/20 border border-types-250"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <h3 className="font-medium text-[14px]">Settings</h3>
              <div className="flex space-y-2">
                <div className="flex items-center w-full px-4 py-4 border rounded-lg bg-types-100/20 border-types-250">
                  <h3 className="flex-1 font-medium">Animated</h3>
                  <Form.Toggle
                    onClick={(val) => update('animated', val)}
                    id="what"
                    active={data.animated}
                  />
                </div>
              </div>
              <div className="flex items-center w-full px-4 py-4 border rounded-lg bg-types-100/20 border-types-250">
                <h3 className="flex-1 font-medium">Responsive</h3>
                <Form.Toggle
                  onClick={(val) => update('responsive', val)}
                  id="responsive"
                  active={data.responsive}
                />
              </div>{' '}
            </div>{' '}
            <div className="flex flex-col space-y-3">
              <h3 className="font-medium text-[14px]">Apperance</h3>
              <div className="flex space-y-2">
                <div className="flex flex-col items-start w-full px-4 py-4 border rounded-lg bg-types-100/20 border-types-250">
                  <h3 className="flex-1 font-medium">Theme</h3>
                  <div className="flex flex-col w-full mt-2 space-y-1">
                    <button
                      onClick={() => update('theme', 'light')}
                      className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-types-200 animate bg-types-150"
                    >
                      Light{' '}
                      <Form.Radio
                        onClick={() => update('theme', 'light')}
                        name="light"
                        id="theme"
                        active={data.theme == 'light'}
                      />
                    </button>
                    <button
                      onClick={() => update('theme', 'dark')}
                      className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-types-200 animate bg-types-150"
                    >
                      Dark{' '}
                      <Form.Radio
                        name="dark"
                        onClick={() => update('theme', 'dark')}
                        id="theme"
                        active={data.theme == 'dark'}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Button.Primary
              onClick={onSave}
              title="Save"
              disabled={!unsavedChanges}
            />
          </Form.Wrapper>
        </React.Fragment>
      </Modal>
      <div className="space-y-12 mt-[95px]">
        <div className="flex flex-col">
          <div className="flex items-center">
            <h1 className="mr-3 text-2xl font-semibold text-white">{title}</h1>
            <div className="flex space-x-2">
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
