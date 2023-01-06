import toast from 'react-hot-toast';
import { INavItem } from '../../../../lib/types';
import useAuthState from '../../../../store/auth';
import { signOutUser } from '../../../../utils/hooks/api/user';
import { Button } from '../../../Buttons';
import Link from '../../../layout/Link';
import NavItem from './components/NavItem';

function PhoneMenu({ toggle }: { toggle: (val: boolean) => void }) {
  const currentUser = useAuthState();

  async function handleLogout() {
    const signedOut = await signOutUser();
    if (!signedOut.error) {
      useAuthState.setState({ isLoggedIn: false, user: {} });
      toggle(false);
      toast.success('Logged out');
    }
  }
  const items = [
    { label: 'Home', route: '/' },
    { label: 'Components', route: '/components/css3' },
    {
      label: 'New component',
      route: '/new',
      condition: currentUser.isLoggedIn,
    },
    {
      label: 'Beta Roadmap',
      route: '/beta',
    },
    {
      label: 'Sign out',
      condition: currentUser.isLoggedIn,
      onClick: () => handleLogout(),
    },
  ] as INavItem[];

  return (
    <div className="p-4 pt-2 h-screen absolute inset-0 bg-types-75 mt-[65px] border-t border-types-150">
      {items.map((x) => (
        <NavItem {...x} />
      ))}
      {!currentUser.isLoggedIn && (
        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/twitter`}>
          <Button.White
            title="Sign in with GitHub"
            icon={'fa-brands fa-github'}
            className="w-full !mt-5 !py-3 !text-white/60 !bg-types-150/60"
          />
        </Link>
      )}
    </div>
  );
}

export default PhoneMenu;
