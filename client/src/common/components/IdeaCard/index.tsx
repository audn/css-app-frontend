import { useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
import { useAuthState } from '../../../store/auth';
import { Idea } from '../../lib/interfaces';
import Link from '../layout/Link';
import { User } from '../User';
import Delete from './components/Delete';
import Upvote from './components/Upvote';
import { onDeleteIdea, onUpvoteIdea } from './services';

function IdeaCard({
  dateAdded,
  id,
  upvotes,
  message,
  userId,
  user,
}: Idea.Idea) {
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
    <Link href={`/idea/${id}`} className="relative text-on-150">
      <div className="flex items-center">
        <div className="flex w-full">
          <User.Avatar {...user!} />
          <div className="w-full px-4 py-3 ml-3 bg-opacity-50 rounded-xl bg-types-100 bosrder pyd-5 border-types-100 group">
            <div className="flex space-x-2 text-[15px]">
              <h3 className="font-semibold text-white">{user!.name}</h3>
              <h5>@{user!.username}</h5>
              <span>·</span>
              <TimeAgo date={dateAdded} />
            </div>
            <div className="flex items-center justify-between">
              <p className="mt-1 text-white">{message}</p>
              <Delete onClick={handleDelete} />
            </div>
          </div>
        </div>
        <Upvote handleUpvote={handleUpvote} upvoted={upvoted} votes={votes} />
      </div>
    </Link>
  );
}

export default IdeaCard;
