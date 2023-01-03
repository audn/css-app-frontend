import useFilterState from '../../store/filter';
import useSidebarState from '../../store/sidebar';
import concat from '../../utils/helpers/concat';
import CreatNew from './components/CreatNew';
import NavItem from './components/NavItem';
import SearchBar from './components/SearchBar';
import SidebarFooter from './components/SidebarFooter';

function Sidebar({ toggleCreateType }: { toggleCreateType: () => void }) {
  const library = useFilterState((s) => s.library);
  const isSidebarCollapsed = useSidebarState((s) => s.isCollapsed);

  const items = [
    { label: 'Home', icon: 'fa-regular fa-home', route: '/' },

    {
      label: 'Components',
      icon: 'fa-regular fa-cube',
      route: `/components/${library.toLowerCase()}`,
    },
    {
      label: 'Layouts',
      icon: 'fa-regular fa-table-layout',
      route: `/layouts/${library.toLowerCase()}`,
    },
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
        'fixed left-0 inset-y-0 py-8 px-4 w-full bg-types-body border-r border-types-150 min-h-screen transition-all ease-out durtion-200 z-10',
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
        <img
          src={`/logo1.svg`}
          className={concat(
            isSidebarCollapsed ? 'w-8 h-8' : 'mr-2 w-10 h-10 ml-[0.35rem]',
            '',
          )}
        />
        {!isSidebarCollapsed && (
          <CreatNew toggleCreateType={toggleCreateType} />
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
        <h3 className="text-sm font-medium text-white uppercase">Pinned</h3>

        <SidebarFooter />
      </div>
    </div>
  );
}

export default Sidebar;
