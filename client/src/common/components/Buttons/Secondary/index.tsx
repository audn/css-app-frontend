import { Button } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';
import LoadingIcon from '../../misc/LoadingIcon';

function SecondaryButton({
  title,
  isLoading,
  disabled,
  icon,
  className,
}: Button.Base) {
  return (
    <button
      disabled={disabled}
      className={concat(
        className ? className : '',
        'flex whitespace-nowrap shadow w-full items-center justify-center px-4 py-[0.5rem] text-on-100 bg-types-200 outline-none active:opacity-90 rounded-md disabled:bg-types-100 hover:opacity-80 animate disabled:opacity-50 text-sm font-medium ',
      )}
    >
      {isLoading ? (
        <LoadingIcon />
      ) : (
        icon && (
          <span className="flex items-center mr-2 text-lg">
            <i className={icon} />
          </span>
        )
      )}
      {title}
    </button>
  );
}

export default SecondaryButton;
