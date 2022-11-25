import useAuthState from '../../store/auth';
import Dropdown from '../Dropdown';
import Logo from '../misc/Logo';
import Navigation from './Navigation';

export const Header = () => {
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
    <header className="fixed top-0 z-50 w-full px-6 py-5 bg-types-body/20 filter backdrop-blur">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo />
          <div className="relative">
            <Dropdown
              active={library}
              options={{ animateCaret: true, box: true, caret: true }}
              list={[
                {
                  label: 'Bulma',
                },
                {
                  label: 'TailwindCSS',
                },
              ]}
              onClick={setLibrary}
            >
              {library}
            </Dropdown>
          </div>
        </div>
        <Navigation />
      </div>
    </header>
  );
};
