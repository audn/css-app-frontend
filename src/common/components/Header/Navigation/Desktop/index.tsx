import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../../../Buttons';
import Auth from '../../../layout/Auth';
import Link from '../../../layout/Link';
import SelectCreateType from '../../SelectType';

function DesktopMenu() {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  return (
    <div className="items-center hidden space-x-5 sm:flex">
      <AnimatePresence>
        {isCreateOpen && (
          <SelectCreateType
            isOpen={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
          />
        )}
      </AnimatePresence>
      <Auth.User>
        <></>
        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/twitter`}>
          <Button.Secondary trustRoute={true} title="Sign in" />
        </Link>
      </Auth.User>
    </div>
  );
}

export default DesktopMenu;
