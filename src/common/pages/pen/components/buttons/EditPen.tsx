import Tooltip from '../../../../components/layout/Tooltip';

function EditPenButton({ onClick }: { onClick: () => void }) {
  return (
    <Tooltip id="edit" text="Edit pen">
      <button
        onClick={onClick}
        className={
          'flex items-center justify-center rounded-full w-7 h-7 bg-types-200'
        }
      >
        <i className="text-xs fa-solid fa-pen-to-square" />
      </button>
    </Tooltip>
  );
}

export default EditPenButton;
