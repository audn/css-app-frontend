import { SyntheticEvent } from 'react';
import Tooltip from '../../../../layouts/Tooltip';
import { fadeIn } from '../../../../utils/data/animations';
import concat from '../../../../utils/helpers/concat';
import Animate from '../../../layout/Animate';

function Upvote({
  onClick,
  active,
}: {
  onClick: (e: SyntheticEvent) => void;
  active: boolean;
}) {
  return (
    <Tooltip text="Upvote" options={{ place: 'right' }} id="upvote">
      <Animate
        variants={fadeIn}
        onClick={(e) => onClick(e as SyntheticEvent)}
        className={concat(
          active ? 'bg-types-200 text-indigo-500' : 'hover:bg-types-200',
          'flex items-center justify-center rounded-full w-7 h-7 ',
        )}
      >
        <i className="text-sm sm:text-lg fa-solid fa-caret-up !leading-0" />
      </Animate>
    </Tooltip>
  );
}

export default Upvote;
