import useAuthState from '../../../../store/auth';
import { signOutUser } from '../../../../utils/hooks/api/user';
import { Button } from '../../../Buttons';
import Auth from '../../../layout/Auth';
import Link from '../../../layout/Link';

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
          <Link href="/new">
            <Button.Secondary title="New component" />
          </Link>
          <Button.Secondary title="Logout" onClick={handleLogout} />
        </div>

        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/twitter`}>
          <Button.Secondary trustRoute={true} title="Sign in" />
        </Link>
      </Auth.User>
    </div>
  );
}

export default DesktopMenu;
