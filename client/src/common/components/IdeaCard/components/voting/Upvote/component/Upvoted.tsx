import { fadeIn } from '../../../../../../utils/data/animations';
import Animate from '../../../../../layout/Animate';

function Upvoted() {
  return (
    <Animate variants={fadeIn} key={'upvote'}>
      <i className="text-sm sm:text-lg fak fa-upvote-1" />
    </Animate>
  );
}

export default Upvoted;
