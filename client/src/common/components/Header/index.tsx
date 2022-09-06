import { useCookies } from 'react-cookie';
import { IListItem } from '../../lib/interfaces';
import { useAuthState } from '../../lib/store/auth';
import { logout } from '../../utils/hooks/user';
import Dropdown from '../Dropdown';
import { User } from '../User';
import MenuItems from './components/MenuItems';

function Header() {
  const [_, setCookie, removeCookie] = useCookies(['access_token']);
  const { currentUser, isLoggedIn } = useAuthState((s) => ({
    currentUser: s.user,
    isLoggedIn: s.isLoggedIn,
  }));
  function handleLogout() {
    removeCookie('access_token');
    logout();
  }

  const dropdown = [
    {
      label: 'My profile',
      icon: 'fa-solid fa-user',
      route: '/user/me',
    },

    {
      label: 'Sign out',
      className: 'hover:bg-opacity-10 hover:bg-red-500 hover:!text-red-500',
      icon: 'fa-solid fa-sign-out-alt',
      onClick: () => handleLogout(),
    },
  ] as IListItem[];

  return (
    <div className="absolute inset-x-0">
      <div className="relative flex justify-between p-5 mx-auto sm:p-8">
        <MenuItems />
        {isLoggedIn && (
          <Dropdown list={dropdown}>
            <User.Avatar user={currentUser} className="!w-[35px] !h-[35px]" />
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default Header;
