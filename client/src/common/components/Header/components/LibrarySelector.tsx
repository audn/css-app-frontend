import useAuthState from '../../../store/auth';
import { useLibraries } from '../../../utils/hooks/libraries';
import Dropdown from '../../Dropdown';

function LibrarySelector() {
  const { data, isLoading } = useLibraries();

  const library = useAuthState(
    (s) => s.user.preferences?.preferredLibrary || 'TailwindCSS',
  );
  const setLibrary = (val: string) => {
    useAuthState.setState({
      user: {
        preferences: { preferredLibrary: val },
      },
    });
  };
  return (
    <Dropdown
      active={library}
      options={{ animateCaret: true, box: true, caret: true }}
      isLoading={isLoading}
      list={data ? data?.payload?.results : []}
      onClick={setLibrary}
    >
      {library}
    </Dropdown>
  );
}

export default LibrarySelector;
