import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { fadeIn } from '../../../utils/data/animations';
import handleScrollbarChange from '../../../utils/helpers/scrollbarModal';
import Animate from '../../layout/Animate';
import Hamburger from '../components/Hamburger';
import DesktopMenu from './Desktop';
import PhoneMenu from './Phone';

function Navigation({
  setIsOpenPhoneMenu,
  isOpenPhoneMenu,
}: {
  setIsOpenPhoneMenu: (val: boolean) => void;
  isOpenPhoneMenu: boolean;
}) {
  useEffect(() => {
    handleScrollbarChange(isOpenPhoneMenu);
  }, [isOpenPhoneMenu]);

  return (
    <div>
      <DesktopMenu />
      <Hamburger onClick={setIsOpenPhoneMenu} isOpen={isOpenPhoneMenu} />
      <AnimatePresence>
        {isOpenPhoneMenu && (
          <Animate variants={fadeIn}>
            <PhoneMenu toggle={setIsOpenPhoneMenu} />
          </Animate>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navigation;
