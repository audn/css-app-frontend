import { useEffect } from 'react';
import useFilterState from '../../store/filter';
import useSidebarState from '../../store/sidebar';
import concat from '../../utils/helpers/concat';
import { Button } from '../Buttons';
import Auth from '../layout/Auth';
import Link from '../layout/Link';
import Bookmarks from './components/Bookmarks';
import CreatNew from './components/CreatNew';
import NavItem from './components/NavItem';
import SearchBar from './components/SearchBar';
import SidebarFooter from './components/SidebarFooter';

function Sidebar() {
// { toggleCreateType }: { toggleCreateType: () => void }
  const library = useFilterState((s) => s.library);
  const { isSidebarCollapsed } = useSidebarState((s) => ({
    isSidebarCollapsed: s.isCollapsed,
  }));

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 900) {
        useSidebarState.setState({ isCollapsed: true });
      } else {
        // if (!isSidebarCollapsed) {
        useSidebarState.setState({ isCollapsed: false });
        // }
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = [
    { label: 'Home', icon: 'fa-regular fa-home', route: '/' },

    {
      label: 'Components',
      icon: 'fa-regular fa-cube',
      route: `/components/${library.toLowerCase()}`,
    },
    // {
    //   label: 'Layouts',
    //   icon: 'fa-regular fa-table-layout',
    //   route: `/layouts/${library.toLowerCase()}`,
    // },
    // { label: 'Following', icon: 'fa-solid fa-users', route: '/followers' },
    {
      label: 'Beta Roadmap',
      icon: 'fa-regular fa-info-circle',
      route: '/beta',
    },
  ];

  return (
    <div
      className={concat(
        isSidebarCollapsed ? 'max-w-[70px]' : 'max-w-[290px] ',
        'fixed left-0 inset-y-0 py-8 px-4 w-full bg-types-body border-r border-types-150 min-h-screen transition-all ease-out duration-75 z-30',
      )}
    >
      <div
        className={concat(
          isSidebarCollapsed ? 'justify-center' : 'justify-between',
          'flex items-center transition-all ease-out durtion-200',
        )}
      >
        {/* <img
          src={`/logo.svg`}
          className="ml-[0.35rem] rounded-full w-7 h-7 mr-2"
        /> */}
        <Link href="/">
          <img
            src={`/logo1.svg`}
            className={concat(
              isSidebarCollapsed ? 'w-8 h-8' : 'mr-2 w-8 h-8',
              '',
            )}
          />
        </Link>
        {!isSidebarCollapsed && (
          <Auth.User>
            <CreatNew
            //   toggleCreateType={toggleCreateType}
            />
            <Link
              target="_self"
              href={`${process.env.NEXT_PUBLIC_API_URL}/auth/github`}
            >
              <Button.White
                icon="fa-brands fa-github"
                trustRoute={true}
                title="Sign in"
                className="!bg-types-100 !text-white/60 rounded-full !px-3 !py-[0.4rem]"
              />
            </Link>
          </Auth.User>
        )}
      </div>
      <div
        className={concat(
          isSidebarCollapsed ? 'items-center space-y-2' : 'space-y-1',
          'flex flex-col mt-5 ',
        )}
      >
        {items.map((x) => (
          <NavItem {...x} />
        ))}
        {!isSidebarCollapsed && <SearchBar />}
      </div>
      <div className="mt-10">
        <Bookmarks />
        <SidebarFooter />
      </div>
    </div>
  );
}

export default Sidebar;
