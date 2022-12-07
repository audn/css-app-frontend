import { ChangeEvent } from 'react';
import { API } from '../../../lib/interfaces';
import { useLibraryLabel } from '../../../utils/data/libraries';
import { useLibraries } from '../../../utils/hooks/libraries';
import Dropdown from '../../Dropdown';

function LibraryDropdown({
  data,
  update,
}: {
  update: (key: keyof API.Models.Post, value: string | boolean) => void;
  data: Partial<API.Models.Post>;
  //   onSetting: () => void;
}) {
  const { data: libs, isLoading } = useLibraries();

  function changeLib(event: ChangeEvent<HTMLSelectElement>) {
    const lib = event.target.value;
    const latestVersion = libs?.payload?.results.filter(
      (x) => x.label === lib,
    )[0].versions[0];

    update('library', lib);
    if (latestVersion) {
      update('libraryVersion', latestVersion);
    }
  }

  function changeVersion(event: ChangeEvent<HTMLSelectElement>) {
    const version = event.target.value;
    update('libraryVersion', version);
  }

  return (
    <Dropdown
      className="py-[0.4em]"
      isLoading={isLoading}
      options={{ animateCaret: true, box: true, caret: true }}
      component={
        <div className="flex flex-col p-1">
          <span className="mb-2 text-sm">Library</span>
          <select
            id="library"
            name="library"
            value={data.library}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              changeLib(event)
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
            value={data.libraryVersion}
            name="version"
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              changeVersion(event)
            }
            className="px-3 py-2 text-sm bg-types-250 focus:outline-none"
          >
            {libs?.payload?.results
              .filter((x) => x.label === data.library)
              .map((x) =>
                x.versions.map((x) => <option value={x}>v{x}</option>),
              )}
          </select>
        </div>
      }
    >
      {useLibraryLabel(data.library)}{' '}
      <span className="ml-2 text-xs">(v{data.libraryVersion})</span>
    </Dropdown>
  );
}

export default LibraryDropdown;
