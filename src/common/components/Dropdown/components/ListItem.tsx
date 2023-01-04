import { useRouter } from 'next/router';
import { INavItem } from '../../../lib/types';
import concat from '../../../utils/helpers/concat';
import { validateUrl } from '../../../utils/helpers/regex/url';

function ListItem({
  label,
  active,
  icon,
  showLibraryVector,
  _count,
  onClick,
  route,
  value,
  className,
  onGlobalClick,
}: INavItem & {
  showLibraryVector?: boolean;
  onGlobalClick: (val: string) => void;
}) {
  const activeItem = active == label;
  const router = useRouter();
  function handleClick() {
    if (route) {
      if (validateUrl(route)) {
        window.open(route, '_blank');
      } else {
        router.push(route);
      }
    } else if (typeof onClick == 'function') {
      onClick(label);
    }
    onGlobalClick(label);
  }

  return (
    <li
      className={concat(
        className ? className : '',
        'flex items-center p-2 rounded cursor-pointer font-medium animate text-sm text-white/60 hover:text-white justify-between active:bg-opacity-80 hover:bg-types-150/50',
      )}
      onClick={handleClick}
    >
      <div className="flex items-center">
        {_count && (
          <div className="w-4">
            {activeItem && <i className="text-[10px] fa-regular fa-check" />}
          </div>
        )}
        {icon && (
          <div className="flex-shrink-0 w-6 text-sm text-left">
            <i className={`${icon}`} />
          </div>
        )}
        {showLibraryVector && (
          <img src={`/libraries/${value}.svg`} className="w-4 h-4 mr-2" />
        )}
        {label}
      </div>
      {_count && (
        <span className="flex items-center justify-center px-2 py-1 h-[24px] text-[12px] rounded-full bg-types-150/60 text-on-50">
          {router.pathname == '/layouts/[library]'
            ? _count.layouts
            : _count.components}
        </span>
      )}
    </li>
  );
}

export default ListItem;
