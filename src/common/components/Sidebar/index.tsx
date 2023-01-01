import useFilterState from '../../store/filter';
import NavItem from './components/NavItem';

function Sidebar() {
  const library = useFilterState((s) => s.library);
  const items = [
    { label: 'Home', icon: 'fa-solid fa-home', route: '/' },
    {
      label: 'Components',
      icon: 'fa-solid fa-cube',
      route: `/components/${library.toLowerCase()}`,
    },
    {
      label: 'Pages',
      icon: 'fa-solid fa-memo',
      route: `/pages/${library.toLowerCase()}`,
    },
    // { label: 'Following', icon: 'fa-solid fa-users', route: '/followers' },
    {
      label: 'Beta Roadmap',
      icon: 'fa-solid fa-info-circle',
      route: '/beta',
    },
    // { label: 'Settings', icon: 'fa-regular fa-cog', route: '/settings' },
  ];
  return (
    <div className="min-w-[290px]  fixed left-0 inset-y-0  p-4 bg-types-body border-r border-types-150 min-h-screen ">
      <img src={`/logo.svg`} className="w-10 h-10 rounded-full" />
      <div className="flex flex-col mt-5 space-y-1">
        {items.map((x) => (
          <NavItem {...x} />
        ))}
        <div className="relative flex items-center !mt-2">
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
    </div>
  );
}

export default Sidebar;
