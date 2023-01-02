import { INavItem } from '../../lib/types';
import useAuthState from '../../store/auth';
import useFilterState from '../../store/filter';
import { signOutUser } from '../../utils/hooks/api/user';
import Dropdown from '../Dropdown';
import Link from '../layout/Link';
import NavItem from './components/NavItem';

function Sidebar() {
  const isLoggedIn = useAuthState((s) => s.isLoggedIn);
  const user = useAuthState((s) => s.user);
  const library = useFilterState((s) => s.library);
  async function handleLogout() {
    const signedOut = await signOutUser();
    if (!signedOut.error) {
      useAuthState.setState({ isLoggedIn: false, user: {} });
    }
  }
  const items = [
    { label: 'Home', icon: 'fa-regular fa-home', route: '/' },

    {
      label: 'Components',
      icon: 'fa-regular fa-cube',
      route: `/components/${library.toLowerCase()}`,
    },
    {
      label: 'Pages',
      icon: 'fa-regular fa-memo',
      route: `/pages/${library.toLowerCase()}`,
    },
    // { label: 'Following', icon: 'fa-solid fa-users', route: '/followers' },
    {
      label: 'Beta Roadmap',
      icon: 'fa-regular fa-info-circle',
      route: '/beta',
    },

    // {
    //   condition: isLoggedIn,
    //   customIcon: (
    //     <div className="flex justify-start w-7 text-brand-primary-100 group-hover:text-types-50">
    //       <div className="flex items-center justify-center group-hover:bg-brand-primary-150/60  w-5 h-5 mr-1 rounded-md -ml-[0.2rem] bg-brand-primary-100/30 ">
    //         <i className={'text-sm fa-regular fa-plus'} />
    //       </div>
    //     </div>
    //   ),
    //   label: (
    //     <div className="flex items-center text-brand-primary-100 group-hover:text-types-50">
    //       Create new
    //     </div>
    //   ),
    //   route: '/new',
    // },
    // {
    //   label: (
    //     <div className="flex justify-between w-full">
    //       Search
    //       <div className="flex items-center space-x-1">
    //         <div className="px-2 py-1 text-xs rounded-md bg-types-150/30">
    //           <abbr title="Command" className="no-underline">
    //             ⌘{' '}
    //           </abbr>
    //         </div>
    //         <div className="px-2 py-1 text-xs rounded-md bg-types-150/30">
    //           K
    //         </div>
    //       </div>
    //     </div>
    //   ),
    //   icon: 'fa-solid fa-magnifying-glass',
    //   route: '/search',
    // },
  ];
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
    <div className="min-w-[290px] fixed left-0 inset-y-0 py-8 px-4 bg-types-body border-r border-types-150 min-h-screen">
      <div className="flex items-center justify-between">
        <img
          src={`/logo.svg`}
          className="ml-[0.35rem] rounded-full w-7 h-7 mr-2"
        />{' '}
        <Link
          href="/new"
          className="flex group items-center px-3 py-[0.4rem] text-sm font-medium rounded-full bg-types-150/30 hover:text-white/80 hover:bg-types-150/50 animate"
        >
          Create
          <div className="flex items-center justify-center w-5 h-5 ml-2 rounded-full group-hover:bg-types-250 bg-types-150 ">
            <i className={'text-sm fa-regular fa-plus'} />
          </div>
        </Link>
      </div>
      <div className="flex flex-col mt-5 space-y-1">
        {items.map((x) => (
          <NavItem {...x} />
        ))}

        <div className="relative flex items-center !mt-3">
          <div className="absolute left-4">
            <i className="fa-solid fa-magnifying-glass" />
          </div>
          <input
            type="text"
            className="px-6 pl-10 py-[0.5rem] placeholder:text-white/50 focus:outline-none focus:bg-types-150/80 rounded-full bg-types-100"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-sm font-medium text-white uppercase">Pinned</h3>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="flex items-center justify-between pt-4 border-t border-types-150">
          <div className="relative flex items-center max-w-fit">
            <Dropdown
              className="-mt-"
              wrapperClassName="-mt-36 "
              list={userMenu}
              options={{ caret: false, position: 'start', toggleOnClick: true }}
            >
              <img src={user.avatar} className="w-8 h-8 rounded-full" />
              <div className="flex flex-col justify-start ml-2">
                <h2 className="font-medium text-white">{user.displayName}</h2>
                <h3 className="text-sm text-white/60 text-start">
                  @{user.username}
                </h3>
              </div>
            </Dropdown>
          </div>
          <div className="flex items-center space-x-[1px] overflow-hidden rounded-lg bg-types-50">
            <Link
              href="/user/settings"
              className="flex items-center justify-center w-9 h-9 hover:bg-types-200 bg-types-100 hover:bg-types-150 animate"
            >
              <i className="text-base fa-regular fa-cog" />
            </Link>
            <button className="flex items-center justify-center w-9 h-9 hover:bg-types-200 bg-types-100 hover:bg-types-150 animate">
              <i className="text-xl fa-regular fa-arrow-left-from-line" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
