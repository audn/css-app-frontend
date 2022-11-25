import Logo from '../misc/Logo';
import LibrarySelector from './components/LibrarySelector';
import Navigation from './Navigation';

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full px-6 py-5 bg-types-body/20 filter backdrop-blur">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo />
          <LibrarySelector />
        </div>
        <Navigation />
      </div>
    </header>
  );
};
