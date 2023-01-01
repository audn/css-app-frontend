import NavItem from './components/NavItem';

function Sidebar() {
  const items = [
    { label: 'Components', icon: 'fa-solid fa-cube', route: '/' },
    { label: 'Following', icon: 'fa-solid fa-users', route: '/followers' },
    { label: 'Roadmap', icon: 'fa-regular fa-info-circle', route: '/roadmap' },
    { label: 'Settings', icon: 'fa-regular fa-cog', route: '/settings' },
  ];
  return (
    <div className="min-w-[290px]  fixed left-0 inset-y-0  p-4 bg-types-body border-r border-types-150 min-h-screen ">
      <img src={`/logo.svg`} className="w-12 h-12 mt-3 mb-6 rounded-full" />
      <div className="flex flex-col mt-5 space-y-1">
        {items.map((x) => (
          <NavItem {...x} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
