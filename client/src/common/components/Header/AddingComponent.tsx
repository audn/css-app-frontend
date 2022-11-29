import { useRouter } from 'next/router';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { API } from '../../lib/interfaces';
import { addPost } from '../../utils/hooks/api/posts';
import { useLibraries } from '../../utils/hooks/libraries';
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
  const [library, setLibrary] = useState<string>('TailwindCSS');
  const [version, setVersion] = useState<string>('v.3.2.0');
  const [libSource, setLibSource] = useState<string>('v.3.2.0');

  const { data: libs, isLoading } = useLibraries();
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
          isLoading={isLoading}
          options={{ animateCaret: true, box: true, caret: true }}
          component={
            <div className="flex flex-col p-1">
              <span className="mb-2 text-sm">Library</span>
              <select
                id="library"
                name="library"
                value={library}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setLibrary(event.target.value)
                }
                className="px-3 py-2 text-sm bg-types-250 focus:outline-none"
              >
                {libs?.payload?.results.map((x) => (
                  <option value={x.label}>{x.label}</option>
                ))}
              </select>
              <span className="mt-2 mb-2 text-sm">Version</span>
              <select
                id="version"
                value={version}
                name="version"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setVersion(event.target.value)
                }
                className="px-3 py-2 text-sm bg-types-250 focus:outline-none"
              >
                {libs?.payload?.results
                  .filter((x) => x.label === library)
                  .map((x) =>
                    x.versions.map((x) => (
                      <option value={x.value}>{x.value}</option>
                    )),
                  )}
              </select>
            </div>
          }
        >
          {library} <span className="ml-2 text-xs">({version})</span>
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
