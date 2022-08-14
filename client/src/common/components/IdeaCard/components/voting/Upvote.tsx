import Tooltip from '../../../../layouts/Tooltip';
import { fadeIn } from '../../../../utils/data/animations';
import Animate from '../../../layout/Animate';

function Upvote({ onClick, active }: { onClick: () => void; active: boolean }) {
  return (
    <Tooltip text="Upvote" options={{ place: 'right' }} id="upvote">
      <Animate
        variants={fadeIn}
        onClick={onClick}
        className="flex items-center justify-center rounded-full w-7 h-7 hover:bg-types-200"
      >
        <i className="text-sm sm:text-lg fa-solid fa-caret-up !leading-0" />
      </Animate>
    </Tooltip>
  );
}

export default Upvote;
