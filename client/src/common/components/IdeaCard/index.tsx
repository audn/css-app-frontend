import { useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
import { useAuthState } from '../../../store/auth';
import { Idea } from '../../lib/interfaces';
import Link from '../layout/Link';
import { User } from '../User';
import Delete from './components/Delete';
import Upvote from './components/voting/Upvote';
import VoteDetails from './components/voting/VoteDetails';
import { onDeleteIdea, onUpvoteIdea } from './services';

function IdeaCard({ dateAdded, id, upvotes, message, user }: Idea.Idea) {
  const currentUser = useAuthState((s) => s.user);

  let [votes, setVotes] = useState<number>(upvotes?.length ?? 0);
  let [upvoted, setUpvoted] = useState<boolean>(false);

  useEffect(() => {
    if (upvotes?.filter((x) => x.user.id === currentUser.id).length) {
      setUpvoted(true);
    }
    setVotes(upvotes?.length || 0);
  }, [currentUser, id]);

  function handleDelete() {
    onDeleteIdea(id);
  }
  function handleUpvote() {
    onUpvoteIdea({ id, setUpvoted, setVotes, upvoted, votes });
  }

  return (
    <div className="relative text-on-150">
      <div className="flex items-center w-full">
        <div className="flex w-full">
          <User.Author user={user}>
            <User.Avatar user={user} className="!w-10 !h-10 sm:w-12 sm:h-12" />
          </User.Author>
          <Link
            href={`/idea/${id}`}
            className="w-full px-3 py-2 pb-6 ml-2 sm:px-4 sm:py-3 sm:ml-3 rounded-xl bg-types-100 border-types-100 group hover:bg-types-150 animate"
          >
            <div className="flex gap-x-1 sm:gap-x-2 text-[13px] sm:text-[15px]">
              <User.DisplayName user={user} />
              <User.Username user={user} />
              <span className="hidden text-sm sm:flex gap-x-2">
                <span>·</span>
                <TimeAgo date={dateAdded} />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="mt-1 text-white">{message}</p>
              <Delete onClick={handleDelete} />
            </div>
          </Link>
        </div>
        <div className="flex-col items-center hidden ml-6 sm:flex">
          <Upvote handleUpvote={handleUpvote} upvoted={upvoted} votes={votes} />
          <VoteDetails votes={votes} />
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;
