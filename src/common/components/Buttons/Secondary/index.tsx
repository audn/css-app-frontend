import { Button } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';
import LoadingIcon from '../../misc/LoadingIcon';

function SecondaryButton({
  title,
  isLoading,
  disabled,
  icon,
  className,
  onClick,
}: Button.Base) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={concat(
        className ? className : '',
        'flex whitespace-nowrap shadow items-center justify-center px-3 py-[0.4em] text-on-100 hover:bg-types-150 outline-none active:opacity-90 rounded-lg hover:text-white disabled:bg-types-100 hover:opacity-80 animate disabled:opacity-50 text-sm font-medium text-[16px] border-types-250 border',
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
