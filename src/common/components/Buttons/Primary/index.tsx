import { Button } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';
import LoadingIcon from '../../misc/LoadingIcon';

function PrimaryButton({
  title,
  disabled,
  icon,
  isLoading,
  className,
  onClick,
}: Button.Base) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={concat(
        className ? className : '',
        'flex items-center shadow justify-center px-4 py-[0.7em] font-semibold text-white bg-brand-primary-150 outline-none active:opacity-90 rounded-lg disabled:bg-opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 animate disabled:opacity-50 text-[15px]',
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

export default PrimaryButton;
