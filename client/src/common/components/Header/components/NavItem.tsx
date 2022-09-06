import concat from '../../../utils/helpers/concat';
import Link from '../../layout/Link';

type Props = {
  label: string;
  active: boolean;
  route?: string;
};
function NavItem({ label, active, route }: Props) {
  console.log(active);

  return (
    <Link
      href={route!}
      className={concat(
        active ? 'text-white' : 'text-on-100',
        'text-xl sm:text-lg font-semibold ',
      )}
    >
      {label}
    </Link>
  );
}

export default NavItem;
