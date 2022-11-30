import Tooltip from '../../../../components/layout/Tooltip';
import concat from '../../../../utils/helpers/concat';

function DeletePenButton({
  onClick,
  warning,
}: {
  onClick: () => void;
  warning: boolean;
}) {
  return (
    <Tooltip id="delete" text="Delete pen">
      <button
        onClick={onClick}
        className={concat(
          warning
            ? 'bg-orange-500 bg-opacity-20 text-orange-500 px-3 py-[0.3rem] rounded-full text-xs'
            : 'bg-types-200  w-7 h-7 ',
          'flex items-center justify-center rounded-full',
        )}
      >
        {warning ? (
          'Are you sure?'
        ) : (
          <i className="text-xs fa-solid fa-trash-alt" />
        )}
      </button>
    </Tooltip>
  );
}

export default DeletePenButton;
