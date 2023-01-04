import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';

export const Header = () => {
  const router = useRouter();
  const [isOpenPhoneMenu, setIsOpenPhoneMenu] = useState<boolean>(false);

  useEffect(() => {
    setIsOpenPhoneMenu(false);
    return () => setIsOpenPhoneMenu(false);
  }, [router]);

  return (
    <header
      className={
        'px-6 py-4 sticky top-0 inset-x-0 bg-types-body border-b border-types-150 flex justify-between w-full z-50'
      }
    >
      <React.Fragment>
        <img src={`/logo1.svg`} className={'w-8 h-8'} />
        <Navigation
          isOpenPhoneMenu={isOpenPhoneMenu}
          setIsOpenPhoneMenu={setIsOpenPhoneMenu}
        />
      </React.Fragment>
    </header>
  );
};
