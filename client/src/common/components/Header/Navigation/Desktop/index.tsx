import useAuthState from '../../../../store/auth';
import { signOutUser } from '../../../../utils/hooks/api/user';
import { Button } from '../../../Buttons';
import Auth from '../../../layout/Auth';

function DesktopMenu() {
  async function handleLogout() {
    const signedOut = await signOutUser();
    if (!signedOut.error) {
      useAuthState.setState({ isLoggedIn: false, user: {} });
    }
  }

  return (
    <div className="items-center hidden space-x-5 sm:flex">
      <Auth.User>
        <div className="flex space-x-2">
          <Button.Secondary title="New component" route="/pen/new" />
          <Button.Secondary title="Logout" onClick={handleLogout} />
        </div>

        <Button.Secondary
          trustRoute={true}
          title="Sign in"
          route={'https://api.css.app/auth/twitter'}
        />
      </Auth.User>
    </div>
  );
}

export default DesktopMenu;
