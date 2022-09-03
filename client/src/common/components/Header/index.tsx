import { useCookies } from 'react-cookie';
import { IListItem } from '../../lib/interfaces';
import { useAuthState } from '../../lib/store/auth';
import { logout } from '../../utils/hooks/user';
import Dropdown from '../Dropdown';
import { User } from '../User';

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

  const navigation = [
    {
      label: 'About',
      icon: 'fa-solid fa-info-circle',
      route: '/about',
    },

    {
      label: 'GitHub',
      icon: 'fa-brands fa-github',
      route: 'https://github.com/audn/css.app',
    },
    {
      label: 'Sign out',
      className: 'hover:bg-opacity-10 hover:bg-red-500 hover:!text-red-500',
      icon: 'fa-solid fa-sign-out-alt',
      onClick: () => handleLogout(),
    },
  ] as IListItem[];

  return (
    <div className="absolute z-50 flex justify-end right-5 top-5">
      {isLoggedIn && (
        <Dropdown list={navigation}>
          <User.Avatar
            user={currentUser}
            className="!w-[35px] !h-[35px] sm:!h-12 sm:!w-12"
          />
        </Dropdown>
      )}
    </div>
  );
}

export default Header;
