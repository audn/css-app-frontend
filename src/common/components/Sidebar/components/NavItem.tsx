import { useRouter } from 'next/router';
import concat from '../../../utils/helpers/concat';

type Props = {
  label: string;
  icon: string;
  route: string;
};
function NavItem({ label, icon, route }: Props) {
  const router = useRouter();
  const active = route == router.pathname;
  return (
    <button
      className={concat(
        active
          ? 'bg-brand-primary-100 text-types-body'
          : 'hover:bg-brand-primary-100 hover:text-types-body',
        'flex items-center px-3 py-[6px] rounded font-medium animate text-[17px]',
      )}
    >
      <div className="flex justify-start w-7">
        <i className={concat('mr-2', icon)} />
      </div>{' '}
      {label}
    </button>
  );
}

export default NavItem;
