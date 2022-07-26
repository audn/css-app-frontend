import { INavItem } from '../../../../lib/types';
import useAuthState from '../../../../store/auth';
import { signOutUser } from '../../../../utils/hooks/api/user';
import { Button } from '../../../Buttons';
import Dropdown from '../../../Dropdown';
import Auth from '../../../layout/Auth';
import Link from '../../../layout/Link';

function DesktopMenu() {
  const user = useAuthState((s) => s.user);
  async function handleLogout() {
    const signedOut = await signOutUser();
    if (!signedOut.error) {
      useAuthState.setState({ isLoggedIn: false, user: {} });
    }
  }
  const userMenu = [
    {
      label: 'My profile',
      icon: 'fa-regular fa-user',
      route: `/user/${user.id}`,
    },
    {
      label: 'Sign out',
      icon: 'fa-regular fa-sign-out-alt',
      onClick: () => handleLogout(),
    },
  ] as INavItem[];
  return (
    <div className="items-center hidden space-x-5 sm:flex">
      <Auth.User>
        <div className="flex items-center space-x-5">
          <Link href="/new">
            <Button.Secondary title="New component" />
          </Link>
          <div className="relative">
            <Dropdown
              className="mt-2"
              list={userMenu}
              options={{ caret: false, position: 'end', toggleOnClick: true }}
            >
              <img src={user.avatar} className="w-10 h-10 -mt-2 rounded-full" />
            </Dropdown>
          </div>
          {/* <Button.Secondary title="Logout" onClick={handleLogout} /> */}
        </div>

        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/twitter`}>
          <Button.Secondary trustRoute={true} title="Sign in" />
        </Link>
      </Auth.User>
    </div>
  );
}

export default DesktopMenu;
