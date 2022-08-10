import { fadeIn } from '../../../utils/data/animations';
import Animate from '../../layout/Animate';

function Downvoted() {
  return (
    <Animate variants={fadeIn} key="downvote">
      <i className="text-lg fak fa-upvote-regular" />
    </Animate>
  );
}

export default Downvoted;
