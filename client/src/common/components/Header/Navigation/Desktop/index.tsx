import useAuthState from '../../../../store/auth';
import { signOutUser } from '../../../../utils/hooks/api/user';
import { Button } from '../../../Buttons';
import Auth from '../../../layout/Auth';
import { routes } from '../../routes';
import NavItem from './components/NavItem';

function DesktopMenu() {
  async function handleLogout() {
    const signedOut = await signOutUser();
    if (!signedOut.error) {
      useAuthState.setState({ isLoggedIn: false, user: {} });
    }
  }

  return (
    <div className="items-center hidden space-x-5 sm:flex">
      {routes.map((x, i) => (
        <NavItem {...x} key={i} />
      ))}
      <Auth.User>
        <Button.Secondary title="Logout" onClick={handleLogout} />
        <Button.Secondary
          title="Sign in"
          route={'http://localhost:4000/auth/twitter'}
        />
      </Auth.User>
    </div>
  );
}

export default DesktopMenu;
