import { useRouter } from 'next/router';
import { INavItem } from '../../../lib/types';
import concat from '../../../utils/helpers/concat';
import { validateUrl } from '../../../utils/helpers/regex/url';

function ListItem({
  label,
  active,
  icon,
  _count,
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
        'flex items-center p-2 rounded cursor-pointer font-medium animate text-sm text-white/90 hover:text-white justify-between active:bg-opacity-80 hover:bg-brand-primary-150/10',
      )}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="w-4">
          {activeItem && <i className="text-[10px] fa-regular fa-check" />}
        </div>
        {icon && (
          <div className="flex-shrink-0 w-6 text-sm text-left">
            <i className={`${icon}`} />
          </div>
        )}
        {label}
      </div>
      {_count && (
        <span className="flex items-center justify-center w-5 h-5 text-[10px] rounded-full bg-types-150/60 text-on-50">
          {_count[Object.keys(_count)[0]]}
        </span>
      )}
    </li>
  );
}

export default ListItem;
