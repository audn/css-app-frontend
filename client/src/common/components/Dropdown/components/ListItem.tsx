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
        'flex items-center px-3 py-1 rounded-lg cursor-pointer hover:text-white hover:bg-types-150 animate',
      )}
      onClick={handleClick}
    >
      {icon && (
        <div className="w-6">
          <i className={`mr-2 ${icon}`} />
        </div>
      )}
      {label}
    </li>
  );
}

export default ListItem;
