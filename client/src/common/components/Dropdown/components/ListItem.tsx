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
        className ? className : '',
        'flex items-center p-2 rounded cursor-pointer font-medium animate hover:text-on-150 text-sm text-white active:bg-opacity-80 hover:bg-brand-primary-150/10',
      )}
      onClick={handleClick}
    >
      <div className="w-4">
        {activeItem && <i className="text-[10px] fa-regular fa-check" />}
      </div>
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
