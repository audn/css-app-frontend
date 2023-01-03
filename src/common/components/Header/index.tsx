import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LibrarySelector from './components/LibrarySelector';
import Navigation from './Navigation';

export const Header = () => {
  const router = useRouter();
  const [isOpenPhoneMenu, setIsOpenPhoneMenu] = useState<boolean>(false);

  const pagesWithLibrarySelector = [
    '/components/[library]',
    '/',
    '/layouts/[library]',
  ];

  useEffect(() => {
    setIsOpenPhoneMenu(false);
    return () => setIsOpenPhoneMenu(false);
  }, [router]);
  return (
    <header className={'px-10 pt-8 pb-5 flex justify-between w-full'}>
      {router.pathname !== '/beta' && (
        <React.Fragment>
          {pagesWithLibrarySelector.includes(router.pathname) ? (
            <LibrarySelector />
          ) : (
            <>&nbsp;</>
          )}

          <Navigation
            isOpenPhoneMenu={isOpenPhoneMenu}
            setIsOpenPhoneMenu={setIsOpenPhoneMenu}
          />
        </React.Fragment>
      )}
    </header>
  );
};
