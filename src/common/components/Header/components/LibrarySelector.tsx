import { useRouter } from 'next/router';
import useFilterState from '../../../store/filter';
import { useLibraries } from '../../../utils/hooks/libraries';
import Dropdown from '../../Dropdown';

function LibrarySelector() {
  const router = useRouter();
  const { data, isLoading } = useLibraries();

  const library = useFilterState((s) => s.library);

  const setLibrary = (val: string) => {
    useFilterState.setState({
      library: val,
    });
    router.push(`/components/${val.toLowerCase()}`, undefined, {
      shallow: true,
    });
  };
  return (
    <Dropdown
      active={library}
      options={{
        animateCaret: true,
        box: true,
        caret: true,
        toggleOnClick: true,
      }}
      isLoading={isLoading}
      list={data?.payload?.results}
      onClick={setLibrary}
    >
      {library}
    </Dropdown>
  );
}

export default LibrarySelector;
