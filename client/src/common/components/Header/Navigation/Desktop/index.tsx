import useAuthState from '../../../../store/auth';
import { signOutUser } from '../../../../utils/hooks/api/user';
import { Button } from '../../../Buttons';
import { routes } from '../../routes';
import NavItem from './components/NavItem';

function DesktopMenu() {
  //   const user = useAuthState((s) => s.user);
  //   const isLoggedIn = useAuthState((s) => s.isLoggedIn);
  const { user, isLoggedIn } = useAuthState((s) => ({
    user: s.user,
    isLoggedIn: s.isLoggedIn,
  }));

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
      {!isLoggedIn ? (
        <Button.Secondary
          title="Sign in"
          route={'http://localhost:4000/auth/twitter'}
        />
      ) : (
        <Button.Secondary title="Logout" onClick={handleLogout} />
      )}
    </div>
  );
}

export default DesktopMenu;
