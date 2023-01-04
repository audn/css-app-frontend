import { INavItem } from '../../../lib/types';
import useAuthState from '../../../store/auth';
import useSidebarState from '../../../store/sidebar';
import { signOutUser } from '../../../utils/hooks/api/user';
import Dropdown from '../../Dropdown';
import Link from '../../layout/Link';

function SidebarFooter() {
  const { isSidebarCollapsed } = useSidebarState((s) => ({
    isSidebarCollapsed: s.isCollapsed,
  }));
  const toggleSidebar = () => {
    useSidebarState.setState({ isCollapsed: !isSidebarCollapsed });
  };

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
  const userMenu = [
    {
      label: 'My profile',
      icon: 'fa-regular fa-user',
      route: `/user/${user.id}`,
    },
    {
      label: 'Settings',
      icon: 'fa-regular fa-cog',
      route: '/user/settings',
    },
    {
      label: 'Expand Sidebar',
      icon: 'fa-regular fa-arrow-right-from-line',
      onClick: () => toggleSidebar(),
    },
    {
      label: 'Sign out',
      icon: 'fa-regular fa-sign-out-alt',
      onClick: () => handleLogout(),
    },
  ] as INavItem[];
  return (
    <div className="absolute inset-x-0 bottom-0 p-4">
      {isSidebarCollapsed && (
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center mb-5 rounded-md w-9 h-9 bg-types-100 hover:bg-types-150 animate"
        >
          <i className="text-xl fa-regular fa-arrow-right-from-line" />
        </button>
      )}
      <div className="flex items-center justify-between pt-4 border-t border-types-150">
        {isLoggedIn && (
          <div className="relative flex items-center max-w-fit">
            <Dropdown
              wrapperClassName="!bottom-10 !top-[inherit]"
              list={userMenu}
              options={{
                caret: false,
                position: 'start',
                toggleOnClick: true,
              }}
            >
              <img src={user.avatar} className="w-8 h-8 rounded-full" />
              {!isSidebarCollapsed && (
                <div className="flex flex-col justify-start ml-3 text-start">
                  <h2 className="font-medium text-white">{user.displayName}</h2>
                  <h3 className="text-sm text-white/60">@{user.username}</h3>
                </div>
              )}
            </Dropdown>
          </div>
        )}
        {!isSidebarCollapsed && (
          <div className="flex items-center space-x-[1px] overflow-hidden rounded-lg bg-types-50">
            {isLoggedIn && (
              <Link
                href="/user/settings"
                className="flex items-center justify-center w-9 h-9 bg-types-100 hover:bg-types-150 animate"
              >
                <i className="text-base fa-regular fa-cog" />
              </Link>
            )}
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center w-9 h-9 bg-types-100 hover:bg-types-150 animate"
            >
              {isSidebarCollapsed ? (
                <i className="text-xl fa-regular fa-arrow-right-from-line" />
              ) : (
                <i className="text-xl fa-regular fa-arrow-left-from-line" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SidebarFooter;
