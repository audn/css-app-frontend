import Downvoted from '../Downvoted';
import Upvoted from '../Upvoted';
import Votes from './component/Votes';
import VotesPeer from './component/VotesPeer';

function Upvote({
  handleUpvote,
  upvoted,
  votes,
}: {
  handleUpvote: () => void;
  upvoted: boolean;
  votes: number;
}) {
  return (
    <div className="flex flex-col items-center ml-6 ">
      <button
        onClick={handleUpvote}
        className="animate hover:text-white text-on-150"
      >
        {upvoted ? <Upvoted /> : <Downvoted />}
      </button>{' '}
      <div className="flex items-center justify-center">
        <Votes votes={votes} />
        <VotesPeer />
      </div>
    </div>
  );
}

export default Upvote;
