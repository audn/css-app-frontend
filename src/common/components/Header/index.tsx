import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { INavItem } from '../../lib/types';
import useFilterState from '../../store/filter';
import LibrarySelector from './components/LibrarySelector';
import Navigation from './Navigation';

export const Header = () => {
  const router = useRouter();
  const [isOpenPhoneMenu, setIsOpenPhoneMenu] = useState<boolean>(false);
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
      label: 'Home',
      route: `/`,
    },
    {
      label: 'Browse',
      route: `/components/${library.toLowerCase()}`,
    },
  ] as INavItem[];

  useEffect(() => {
    setIsOpenPhoneMenu(false);
    return () => setIsOpenPhoneMenu(false);
  }, [router]);
  return (
    <header className={'p-10 flex justify-between w-full'}>
      <LibrarySelector />

      <Navigation
        isOpenPhoneMenu={isOpenPhoneMenu}
        setIsOpenPhoneMenu={setIsOpenPhoneMenu}
      />
    </header>
  );
};
