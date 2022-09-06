import concat from '../../../utils/helpers/concat';
import { validateUrl } from '../../../utils/helpers/regex/url';
import Link from '../../layout/Link';

type Props = {
  label: string;
  active: boolean;
  route?: string;
};
function NavItem({ label, active, route }: Props) {
  return (
    <Link
      href={route!}
      className={concat(
        active ? 'text-white' : 'text-on-100',
        'text-xl sm:text-lg font-semibold flex items-center hover:text-white animate',
      )}
    >
      {label}
      {validateUrl(route!) ? (
        <div className="ml-2 text-xs ">
          <div className="fa-solid fa-external-link" />
        </div>
      ) : (
        <></>
      )}
    </Link>
  );
}

export default NavItem;
