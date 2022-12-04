import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../../components/Buttons';
import { Form } from '../../../components/Form';
import Modal from '../../../components/layout/Modal';
import { API } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';
import { editPost } from '../../../utils/hooks/api/posts';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  post: API.Models.Post;
};
function EditModal({ isOpen, onClose, post }: Props) {
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
      onClose();
    } else {
      toast.error('Failed to update');
    }
  }
  return (
    <Modal onClose={() => onClose()} open={isOpen}>
      <React.Fragment>
        <div className="grid grid-cols-3">
          <div></div>
          <h1 className="justify-center text-xl font-bold text-center text-white">
            Edit pen
          </h1>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-types-250/50 animate bg-types-250"
            >
              <i className="fa-solid fa-times" />
            </button>
          </div>
        </div>
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
              <button
                className="flex items-center w-full px-4 py-4 border rounded-lg text-start hover:bg-types-200 animate bg-types-100/20 border-types-250"
                onClick={() => update('animated', !data.animated)}
              >
                <h3 className="flex-1 font-medium">Animated</h3>
                <Form.Toggle
                  onClick={(val) => update('animated', val)}
                  id="what"
                  active={data.animated}
                />
              </button>
            </div>
            <button
              className="flex items-center w-full px-4 py-4 border rounded-lg text-start hover:bg-types-200 animate bg-types-100/20 border-types-250"
              onClick={() => update('responsive', !data.responsive)}
            >
              <h3 className="flex-1 font-medium">Responsive</h3>
              <Form.Toggle
                onClick={(val) => update('responsive', val)}
                id="responsive"
                active={data.responsive}
              />
            </button>
          </div>
          <div className="flex flex-col space-y-3">
            <h3 className="font-medium text-[14px]">Apperance</h3>
            <div className="flex space-y-2">
              <div className="flex flex-col items-start w-full px-4 py-4 border rounded-lg bg-types-100/20 border-types-250">
                <h3 className="flex-1 text-sm font-medium">Theme</h3>
                <div className="flex flex-col w-full mt-2 space-y-1">
                  <button
                    onClick={() => update('theme', 'light')}
                    className={concat(
                      data.theme === 'light'
                        ? 'bg-types-250/80 text-white'
                        : 'bg-types-250/50',
                      'flex items-center justify-between w-full px-3 py-3 rounded hover:text-white/70 animate ',
                    )}
                  >
                    <div className="flex flex-col items-start">
                      <h4 className="font-medium">Light</h4>
                      {/* <p className="text-sm">
                        My pen is coded with a light theme
                      </p> */}
                    </div>
                    <Form.Radio
                      onClick={() => update('theme', 'light')}
                      name="light"
                      id="theme"
                      active={data.theme == 'light'}
                    />
                  </button>
                  <button
                    onClick={() => update('theme', 'dark')}
                    className={concat(
                      data.theme === 'dark'
                        ? 'bg-types-250/80 text-white'
                        : 'bg-types-250/50',
                      'flex items-center justify-between w-full px-3 py-3 rounded hover:text-white/70 animate ',
                    )}
                  >
                    <div className="flex flex-col items-start">
                      <h4 className="font-medium">Dark</h4>
                      {/* <p className="text-sm">
                        My pen is coded with a dark theme
                      </p> */}
                    </div>
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
  );
}

export default EditModal;
