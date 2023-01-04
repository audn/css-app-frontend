import { useRouter } from 'next/router';
import { INavItem } from '../../../../../lib/types';

function NavItem({ route, icon, label, onClick }: INavItem) {
  const router = useRouter();
  function handleClick() {
    if (route) {
      router.push(route);
    } else if (typeof onClick == 'function') {
      onClick(label);
    }
  }
  return (
    <button
      onClick={handleClick}
      className="relative flex justify-start w-full px-2 py-3 text-lg font-medium border-b border-types-150 animate active:text-white/80 sm:text-base sm:font-semibold"
    >
      <span className="flex items-center animate">
        {label}
        {icon && (
          <div className="w-6 text-base text-right">
            <i className={`${icon}`} />
          </div>
        )}
      </span>
    </button>
  );
}

export default NavItem;
