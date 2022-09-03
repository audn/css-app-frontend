import { Button } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';
import { dangerDark } from '../colors';

function SecondaryButton({ label, danger, icon, className }: Button.Base) {
  return (
    <button
      className={concat(
        className ? className : '',
        danger ? dangerDark : '',
        'flex items-center justify-center px-4 py-2 font-semibold bg-types-100 outline-none active:opacity-90 ring-0 focus:ring-types-150 focus:ring-4 rounded-xl disabled:bg-types-100 hover:bg-opacity-80 animate disabled:opacity-50',
      )}
    >
      {icon && (
        <span className="flex items-center mr-2 text-lg">
          <i className={icon} />
        </span>
      )}
      {label}
    </button>
  );
}

export default SecondaryButton;
