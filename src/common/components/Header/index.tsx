import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LibrarySelector from './components/LibrarySelector';
import Navigation from './Navigation';

export const Header = () => {
  const router = useRouter();
  const [isOpenPhoneMenu, setIsOpenPhoneMenu] = useState<boolean>(false);

  const pagesWithLibrarySelector = [
    '/components/[library]',
    '/',
    '/pages/[library]',
  ];

  useEffect(() => {
    setIsOpenPhoneMenu(false);
    return () => setIsOpenPhoneMenu(false);
  }, [router]);
  return (
    <header className={'p-10 flex justify-between w-full'}>
      {pagesWithLibrarySelector.includes(router.pathname) ? (
        <LibrarySelector />
      ) : (
        <>&nbsp;</>
      )}

      <Navigation
        isOpenPhoneMenu={isOpenPhoneMenu}
        setIsOpenPhoneMenu={setIsOpenPhoneMenu}
      />
    </header>
  );
};
