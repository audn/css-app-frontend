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
    <header className={'px-10 pt-8 pb-5 flex justify-between w-full'}>
      {router.pathname !== '/beta' && (
        <>
          {pagesWithLibrarySelector.includes(router.pathname) ? (
            <LibrarySelector />
          ) : (
            <>&nbsp;</>
          )}

          <Navigation
            isOpenPhoneMenu={isOpenPhoneMenu}
            setIsOpenPhoneMenu={setIsOpenPhoneMenu}
          />
        </>
      )}
    </header>
  );
};
