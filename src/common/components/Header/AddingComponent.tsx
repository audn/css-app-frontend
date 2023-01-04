import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { API, IPostSchemas } from '../../lib/interfaces';
import PublishModal from '../../pages/pen/components/PublishModal';
import { Button } from '../Buttons';

export const HeaderAddingComponent = ({
  type,
  data,
  update,
}: {
  type: IPostSchemas;
  update: (key: keyof API.Models.Component, value: string | boolean) => void;
  data: Partial<API.Models.Component>;
}) => {
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [isPublishingOpen, setIsPublishingOpen] = useState<boolean>(false);

  function handleTitleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    setEditingTitle(false);
    if (data.title && data?.title.length < 1) {
      update('title', 'Untitled');
    }
  }

  return (
    <header className="z-50 border-b border-types-150 flex items-center justify-between px-6 h-[60px]">
      <PublishModal
        type={type}
        update={update}
        data={data}
        onClose={() => setIsPublishingOpen(!isPublishingOpen)}
        isOpen={isPublishingOpen}
      />
      <div className="flex flex-col w-full">
        <div className="flex items-center">
          {editingTitle ? (
            <form onSubmit={handleTitleUpdate} className="w-full">
              <input
                placeholder="Untitled"
                autoFocus={true}
                value={data?.title}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  update('title', event.target.value)
                }
                type="text"
                className="w-full text-lg font-medium text-white bg-transparent outline-none codntents text-whit focus:outline-none"
              />
            </form>
          ) : (
            <h1 className="text-lg font-medium text-white">
              {data?.title || 'Untitled'}
            </h1>
          )}
          {!editingTitle && (
            <button
              onClick={() => setEditingTitle(!editingTitle)}
              className="flex items-center hover:text-white"
            >
              <i className="ml-2 text-xs fa-solid fa-pen" />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button.Secondary
          className="!border-0 !bg-brand-primary-100 !text-white"
          title={'Publish'}
          onClick={() => setIsPublishingOpen(true)}
          icon={'fa-solid fa-upload text-sm'}
        />
      </div>
    </header>
  );
};
