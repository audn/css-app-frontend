import { useEffect, useState } from 'react';
import concat from '../../utils/helpers/concat';
import Logo from '../misc/Logo';
import LibrarySelector from './components/LibrarySelector';
import Navigation from './Navigation';

export const Header = () => {
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  if (typeof window !== 'undefined') {
    useEffect(() => {
      function add() {
        setUserHasScrolled(window.pageYOffset > 100);
      }
      function remove() {
        setUserHasScrolled(false);
      }

      window.addEventListener('scroll', add);

      return () => window.removeEventListener('scroll', remove);
    }, []);
  }
  return (
    <header
      className={concat(
        userHasScrolled ? 'border-types-200' : 'border-transparent',
        'sticky top-0 h-[80px] z-50 flex items-center w-full px-6 bg-types-body border-b transition-all ease-out duration-500',
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <div className="flex items-center ml-5 space-x-3">
            <LibrarySelector />
          </div>
        </div>
        <Navigation />
      </div>
    </header>
  );
};
