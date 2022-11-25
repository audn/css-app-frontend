import { useRouter } from 'next/router';
import { INavItem } from '../../../lib/types';
import concat from '../../../utils/helpers/concat';
import { validateUrl } from '../../../utils/helpers/regex/url';

function ListItem({
  label,
  active,
  icon,
  onClick,
  route,
  className,
}: INavItem) {
  const activeItem = active == label;
  const router = useRouter();
  function handleClick() {
    if (route) {
      if (validateUrl(route)) {
        window.open(route, '_blank');
      } else {
        router.push(route);
      }
    } else onClick!(label);
  }
  return (
    <li
      className={concat(
        activeItem ? 'bg-types-150 text-on-150' : 'hover:bg-types-150',
        className ? className : '',
        'flex items-center p-2 rounded cursor-pointer font-medium animate hover:text-on-150 text-sm text-on-50 active:bg-opacity-80',
      )}
      onClick={handleClick}
    >
      {icon && (
        <div className="flex-shrink-0 w-6 text-sm text-left">
          <i className={`${icon}`} />
        </div>
      )}
      {label}
    </li>
  );
}

export default ListItem;
