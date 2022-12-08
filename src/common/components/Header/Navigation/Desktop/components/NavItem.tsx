import { useRouter } from 'next/router';
import { INavItem } from '../../../../../lib/types';
import concat from '../../../../../utils/helpers/concat';
import Link from '../../../../layout/Link';

function NavItem({ route, icon, label }: INavItem) {
  const router = useRouter();
  const active = route === router.asPath;
  return (
    <Link
      href={route ?? '#'}
      className={concat(
        active ? 'text-white' : 'text-on-50 hover:text-white',
        'inline-flex items-center justify-between w-full text-base font-semibold rounded-md cursor-pointer sm:mt-0 hover:bg-header-200 bg-header-150 ',
      )}
    >
      <span className="flex items-center animate">
        {label}
        {icon && (
          <div className="w-6 text-base text-right">
            <i className={`${icon}`} />
          </div>
        )}
      </span>
    </Link>
  );
}

export default NavItem;
