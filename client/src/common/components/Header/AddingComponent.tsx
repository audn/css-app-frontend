import { useRouter } from 'next/router';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { API } from '../../lib/interfaces';
import useAuthState from '../../store/auth';
import { addPost } from '../../utils/hooks/api/posts';
import { Button } from '../Buttons';
import Dropdown from '../Dropdown';
import Link from '../layout/Link';

export const HeaderAddingComponent = ({
  data,
  update,
}: //   onSettings,
{
  update: (key: keyof API.Models.Post, value: string | boolean) => void;
  data: Partial<API.Models.Post>;
  //   onSetting: () => void;
}) => {
  const user = useAuthState((s) => s.user);
  const router = useRouter();
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [isPosting, setIsPosting] = useState<boolean>(false);

  function handleTitleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    setEditingTitle(false);
    if (data.title && data?.title.length < 1) {
      update('title', 'Untitled');
    }
  }
  console.log(user);

  async function publish() {
    setIsPosting(true);
    const posted = await addPost({
      code: data.code,
      title: data.title,

      description:
        "Everything here works just like it does when you're running Tailwind locall with a real build pipeline. You can customize your config file, use features like '@apply', or even add third-party plugins.",
      library: 'tailwindcss',
      category: 'buttons',
    });
    if (posted.payload?.results) {
      router.push({
        pathname: `/pen/[library]/[id]`,
        query: { library: 'tailwindcss', id: posted.payload.results.id },
      });
    }
    setIsPosting(false);
  }
  return (
    <header className="z-50 flex items-start justify-between p-6 border-b border-b-types-200">
      <div className="flex flex-col w-full">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center justify-center mr-3 rounded-full w-7 h-7 bg-types-200"
          >
            <i className="text-xs fa-solid fa-arrow-left" />
          </Link>

          {editingTitle ? (
            <form onSubmit={handleTitleUpdate} className="w-full">
              <input
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
            <h1 className="text-lg font-medium text-white">{data?.title}</h1>
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
        <div className="flex items-center mt-3 text-sm">
          <i className="mr-2 fa-solid fa-info-circle" /> Draft saved just now
        </div>
      </div>
      <div className="flex space-x-2">
        {/* @ts-ignore */}
        <Dropdown
          active={'v3.2.0'}
          options={{ animateCaret: true, box: true, caret: true }}
          list={[
            { value: '3.2.0', label: 'v3.2.0' },
            { value: '2.0.0', label: 'v2.0.0' },
          ]}
        >
          TailwindCSS <span className="ml-2 text-xs">(v.3.2.0)</span>
        </Dropdown>
        <Button.Secondary
          disabled={isPosting}
          title={isPosting ? 'Publishing' : 'Publish'}
          onClick={publish}
          icon={'fa-solid fa-upload text-sm'}
        />
        <Button.Secondary
          title="Settings"
          icon={'fa-solid fa-cog text-sm'}
          route="/new"
        />
      </div>
    </header>
  );
};
