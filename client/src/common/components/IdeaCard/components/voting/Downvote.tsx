import { fadeIn } from '../../../../utils/data/animations';
import Animate from '../../../layout/Animate';

function Downvote({
  onClick,
  active,
}: {
  onClick: () => void;
  active: boolean;
}) {
  return (
    <Animate
      variants={fadeIn}
      key="downvote"
      onClick={onClick}
      className="flex items-center justify-center rounded-full w-7 h-7 hover:bg-types-200"
    >
      <i className="text-sm sm:text-lg fa-solid fa-caret-down !leading-0" />
    </Animate>
  );
}

export default Downvote;
