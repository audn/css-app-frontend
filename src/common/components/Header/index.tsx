import { useEffect, useState } from 'react';
import { INavItem } from '../../lib/types';
import useFilterState from '../../store/filter';
import concat from '../../utils/helpers/concat';
import Logo from '../misc/Logo';
import LibrarySelector from './components/LibrarySelector';
import Navigation from './Navigation';
import NavItem from './Navigation/Desktop/components/NavItem';

export const Header = () => {
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const library = useFilterState((s) => s.library);
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
  const navItems = [
    {
      label: 'Browse',
      route: `/components/${library.toLowerCase()}`,
    },
  ] as INavItem[];
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
          <div className="flex items-center ml-5 md:space-x-3">
            <div className="items-center hidden space-x-3 sm:flex">
              <LibrarySelector />
              <div className="font-bold text-on-50">/</div>
            </div>{' '}
            {navItems.map((x) => (
              <NavItem {...x} />
            ))}
          </div>
        </div>
        <Navigation />
      </div>
    </header>
  );
};
