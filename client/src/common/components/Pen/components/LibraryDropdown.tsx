import { ChangeEvent } from 'react';
import useMainState from '../../../store/main';
import { useLibraries } from '../../../utils/hooks/libraries';
import Dropdown from '../../Dropdown';

function LibraryDropdown() {
  const { data: libs, isLoading } = useLibraries();

  const { library, version } = useMainState((s) => ({
    library: s.library,
    version: s.version,
  }));

  function changeLib(event: ChangeEvent<HTMLSelectElement>) {
    const lib = event.target.value;

    const libObject = libs?.payload?.results.filter((x) => x.label == lib)[0];
    const src = libObject?.versions[0].src;
    const version = libObject?.versions[0].value;

    useMainState.setState({
      version,
      library: lib,
      src: src,
    });
  }
  function changeVersion(event: ChangeEvent<HTMLSelectElement>) {
    const version = event.target.value;

    const libObject = libs?.payload?.results.find((x) => x.label == library);
    const versionObject = libObject?.versions.find((x) => x.value == version);

    useMainState.setState({
      version: version,
      src: versionObject?.src,
    });
  }
  return (
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
            value={version}
            name="version"
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              changeVersion(event)
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
  );
}

export default LibraryDropdown;
