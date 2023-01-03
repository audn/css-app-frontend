import { ChangeEvent } from 'react';
import { API } from '../../../../lib/interfaces';
import { useLibraryLabel } from '../../../../utils/data/libraries';
import { useLibraries } from '../../../../utils/hooks/libraries';
import Dropdown from '../../../Dropdown';

function LibraryDropdown({
  data,
  update,
}: {
  update: (key: keyof API.Models.Component, value: string | boolean) => void;
  data: Partial<API.Models.Component>;
  //   onSetting: () => void;
}) {
  const { data: libs, isLoading } = useLibraries();

  function changeLib(event: ChangeEvent<HTMLSelectElement>) {
    const lib = event.target.value;
    const latestVersion = libs?.payload?.results.filter(
      (x) => x.label === lib,
    )[0].versions[0];

    update('library', lib);

    if (lib === 'CSS3') {
      update('libraryVersion', '');
    } else if (latestVersion) {
      update('libraryVersion', latestVersion);
    }
  }

  function changeVersion(event: ChangeEvent<HTMLSelectElement>) {
    const version = event.target.value;
    update('libraryVersion', version);
  }

  return (
    <Dropdown
      className="py-[0.4em] hover:text-white animate"
      isLoading={isLoading}
      options={{ animateCaret: true, box: false, caret: true }}
      component={
        <div className="flex flex-col p-1">
          <span className="mb-2 text-sm">Library</span>
          <select
            id="library"
            name="library"
            value={useLibraryLabel(data.library)}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              changeLib(event)
            }
            className="px-3 py-2 text-sm bg-types-150/80 focus:outline-none"
          >
            {libs?.payload?.results.map((x) => (
              <option value={x.label}>{x.label}</option>
            ))}
          </select>
          {data.library !== 'CSS3' && (
            <>
              <span className="mt-2 mb-2 text-sm">Version</span>
              <select
                id="version"
                value={data.libraryVersion}
                name="version"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  changeVersion(event)
                }
                className="px-3 py-2 text-sm bg-types-150/80 focus:outline-none"
              >
                {libs?.payload?.results
                  .filter((x) => x.label === useLibraryLabel(data.library))
                  .map((x) =>
                    x.versions.map((x) => <option value={x}>v{x}</option>),
                  )}
              </select>
            </>
          )}
        </div>
      }
    >
      <img src={`/libraries/${data.library}.svg`} className="w-5 h-5 mr-2" />
      <p className="text-sm">{useLibraryLabel(data.library)} </p>{' '}
      {data.library !== 'CSS3' && (
        <span className="ml-2 text-xs">(v{data.libraryVersion})</span>
      )}{' '}
    </Dropdown>
  );
}

export default LibraryDropdown;
