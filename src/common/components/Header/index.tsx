import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useFilterState from '../../store/filter';
import LibrarySelector from './components/LibrarySelector';
import Navigation from './Navigation';

export const Header = () => {
  const router = useRouter();
  const [isOpenPhoneMenu, setIsOpenPhoneMenu] = useState<boolean>(false);

  const library = useFilterState((s) => s.library);

  const pagesWithLibrarytSelector = ['/components/[library]', '/'];
  console.log(router);

  useEffect(() => {
    setIsOpenPhoneMenu(false);
    return () => setIsOpenPhoneMenu(false);
  }, [router]);
  return (
    <header className={'p-10 flex justify-between w-full'}>
      {pagesWithLibrarytSelector.includes(router.pathname) && (
        <LibrarySelector />
      )}

      <Navigation
        isOpenPhoneMenu={isOpenPhoneMenu}
        setIsOpenPhoneMenu={setIsOpenPhoneMenu}
      />
    </header>
  );
};
