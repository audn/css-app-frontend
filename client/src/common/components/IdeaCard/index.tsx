import { SyntheticEvent, useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
import { useAuthState } from '../../../store/auth';
import { Idea } from '../../lib/interfaces';
import Link from '../layout/Link';
import { User } from '../User';
import Downvote from './components/voting/Downvote';
import Upvote from './components/voting/Upvote';
import VoteDetails from './components/voting/VoteDetails';
import VoteWrapper from './components/voting/VoteWrapper';
import { onDownvoteIdea, onUpvoteIdea } from './services';

function IdeaCard({
  dateAdded,
  id,
  upvotes,
  downvotes,
  message,
  user,
  voteCount,
}: Idea.Idea) {
  const currentUser = useAuthState((s) => s.user);

  let [votes, setVotes] = useState<number>(voteCount);
  let [upvoted, setUpvoted] = useState<boolean>(false);
  let [downvoted, setDownvoted] = useState<boolean>(false);

  useEffect(() => {
    console.log(currentUser);
    if (upvotes?.filter((x) => x.user.id === currentUser.id).length) {
      setUpvoted(true);
      setDownvoted(false);
    } else if (
      currentUser.downvotedIdeas?.filter((x) => x.ideaId === id).length
    ) {
      setDownvoted(true);
      setUpvoted(false);
    }
    setVotes(voteCount);
  }, [currentUser, id]);

  const voteController = async (
    action: 'upvote' | 'downvote',
    success: Promise<boolean>,
  ) => {
    const ready = await success;
    if (ready) {
      if (action == 'downvote') {
        setUpvoted(false);
        if (downvoted) {
          setVotes(votes + 1);
        } else setVotes(votes - 1);
        setDownvoted(!downvoted);
      } else if (action == 'upvote') {
        setDownvoted(false);
        if (upvoted) {
          setVotes(votes - 1);
        } else setVotes(votes + 1);
        setUpvoted(!upvoted);
      }
    }
  };
  function handleUpvote(e: SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    voteController('upvote', onUpvoteIdea(id));
  }

  function handleDownvote(e: SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    voteController('downvote', onDownvoteIdea(id));
  }

  return (
    <div className="relative text-on-150">
      <div className="flex items-center w-full">
        <div className="flex w-full">
          <Link
            href={`/idea/${id}`}
            className="flex w-full px-3 py-2 sm:px-4 sm:py-3 sm:ml-3 rounded-xl bg-types-100 border-types-100 group hover:bg-types-150 animate"
          >
            <div className="flex flex-col justify-between w-full ">
              <div className="flex gap-x-1 sm:gap-x-2 items-center text-[13px] sm:text-[15px]">
                <User.Author user={user}>
                  <User.Avatar
                    user={user}
                    className="!w-6 !h-6 sm:!w-7 sm:!h-7"
                  />
                </User.Author>
                <User.DisplayName user={user} />
                <User.Username user={user} />
                <span className="hidden text-sm sm:flex gap-x-2">
                  <span>·</span>
                  <TimeAgo date={dateAdded} />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="mt-1 text-white break-all">{message}</p>
              </div>
            </div>
            <VoteDetails votes={votes} />
            <VoteWrapper>
              <Upvote onClick={handleUpvote} active={upvoted} />
              <Downvote onClick={handleDownvote} active={downvoted} />
            </VoteWrapper>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;
