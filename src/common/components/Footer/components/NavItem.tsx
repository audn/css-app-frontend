import { INavItem } from '../../../lib/types';
import Link from '../../layout/Link';

function NavItem({ label, route }: INavItem) {
  return (
    <li>
      <Link
        href={route ?? '#'}
        className="inline-flex items-center gap-2 rounded-sm hover:underline text-white/70 hover:text-black dark:hover:text-white focus-visible:ariakit-outline"
      >
        {label}
      </Link>
    </li>
  );
}

export default NavItem;
