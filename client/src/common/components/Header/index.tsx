import { useAuthState } from '../../../store/auth';
import { IListItem } from '../../lib/interfaces';
import { logout } from '../../utils/hooks/user';
import Dropdown from '../Dropdown';
import { User } from '../User';

function Header() {
  const { currentUser, isLoggedIn } = useAuthState((s) => ({
    currentUser: s.user,
    isLoggedIn: s.isLoggedIn,
  }));

  const navigation = [
    {
      label: 'About',
      icon: 'fa-solid fa-info-circle',
      route: '#',
    },

    {
      label: 'GitHub',
      icon: 'fa-brands fa-github',
      route: '#',
    },
    {
      label: 'Sign out',
      className: 'hover:bg-opacity-10 hover:bg-red-500 hover:!text-red-500',
      icon: 'fa-solid fa-sign-out-alt',
      onClick: () => logout(),
    },
  ] as IListItem[];

  return (
    <div className="fixed top-0 flex justify-end w-full p-5">
      {isLoggedIn && (
        <Dropdown list={navigation}>
          <User.Avatar user={currentUser} className="w-9 h-9" />
        </Dropdown>
      )}
    </div>
  );
}

export default Header;
