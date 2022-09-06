import { useRouter } from 'next/router';
import { IListItem } from '../../../lib/interfaces';
import NavItem from './NavItem';

function MenuItems() {
  const router = useRouter();
  const navigation = [
    {
      label: 'Home',
      route: '/',
    },

    {
      label: 'About',
      route: '/about',
    },
    {
      label: 'GitHub',
      route: 'https://github.com/audn/css.app',
    },
  ] as IListItem[];
  const active = (route: string) => router.asPath === route;
  return (
    <div className="flex space-x-3 sm:space-x-5">
      {navigation.map((x, i) => (
        <NavItem
          active={active(x.route!)}
          label={x.label}
          route={x.route}
          key={i}
        />
      ))}
    </div>
  );
}

export default MenuItems;
