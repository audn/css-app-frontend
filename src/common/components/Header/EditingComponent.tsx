import { useRouter } from 'next/router';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../../lib/interfaces';
import { editComponent } from '../../utils/hooks/api/components';
import useGenerateThumbnail from '../../utils/useGenerateThumbnail';
import { Button } from '../Buttons';
import LibraryDropdown from '../layout/Pen/components/LibraryDropdown';

export const HeaderEditingComponent = ({
  data,
  update,
}: //   onSettings,
{
  update: (key: keyof API.Models.Component, value: string | boolean) => void;
  data: Partial<API.Models.Component>;
  //   onSetting: () => void;
}) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [editingTitle, setEditingTitle] = useState<boolean>(false);

  function handleTitleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    setEditingTitle(false);
    if (data.title && data?.title.length < 1) {
      update('title', 'Untitled');
    }
  }

  async function savePost() {
    const msg = toast.loading('Saving...');
    setIsSaving(true);
    const newData = (({ author, authorId, ...o }) => o)(data);
    const posted = await editComponent(data.id!, {
      ...newData,
      library: data.library?.toLowerCase(),
    });
    if (posted.payload?.results) {
      toast.success('Saved!', { id: msg });

      router.push(`/component/${data.id}`);
      await useGenerateThumbnail('component', data.id!);
    } else {
      toast.error('Failed to save', { id: msg });
    }
    setIsSaving(false);
  }
  return (
    <header className="z-50 flex items-center justify-between px-6 h-[60px] border-b border-b-types-200">
      <div className="flex flex-col w-full">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center mr-3 rounded-full w-7 h-7 bg-types-200"
          >
            <i className="text-xs fa-solid fa-arrow-left" />
          </button>

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
        {/* <div className="flex items-center mt-3 text-sm">
          <i className="mr-2 fa-solid fa-info-circle" /> Draft saved just now
        </div> */}
      </div>
      <div className="flex items-center space-x-2">
        <LibraryDropdown data={data} update={update} />
        <Button.Secondary
          title={'Save'}
          disabled={isSaving}
          onClick={savePost}
          icon={'fa-solid fa-save text-sm'}
        />
      </div>
    </header>
  );
};
