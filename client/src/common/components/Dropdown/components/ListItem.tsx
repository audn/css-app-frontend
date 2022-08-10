import { useRouter } from 'next/router';
import { IListItem } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';

function ListItem({ label, icon, onClick, route, className }: IListItem) {
  const router = useRouter();
  function handleClick() {
    if (route) {
      router.push(route);
    } else onClick!();
  }
  return (
    <li
      className={concat(
        className ? className : '',
        'flex items-center px-4 py-2 pl-3 rounded-lg cursor-pointer hover:text-white text-[15px] hover:bg-types-150 animate',
      )}
      onClick={handleClick}
    >
      {icon && (
        <div className="w-6 text-base">
          <i className={`mr-[14px] ${icon}`} />
        </div>
      )}
      {label}
    </li>
  );
}

export default ListItem;
