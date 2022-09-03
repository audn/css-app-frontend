import { SyntheticEvent } from 'react';
import Tooltip from '../../../../../layouts/Tooltip';
import concat from '../../../../../utils/helpers/concat';

function Downvote({
  onClick,
  active,
}: {
  onClick: (e: SyntheticEvent) => void;
  active: boolean;
}) {
  return (
    <Tooltip text="Downvote" id="downvote" options={{ place: 'right' }}>
      <button
        onClick={(e) => onClick(e as SyntheticEvent)}
        className={concat(
          active
            ? 'bg-red-500 bg-opacity-10 text-red-500'
            : 'hover:bg-types-200',
          'flex items-center justify-center rounded-full w-7 h-7 ',
        )}
      >
        <i className="text-sm sm:text-lg fa-solid fa-caret-down !leading-0" />
      </button>
    </Tooltip>
  );
}

export default Downvote;
