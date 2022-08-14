import TimeAgo from 'react-timeago';
import { Idea } from '../../lib/interfaces';
import P from '../layout/headings/P';
import Link from '../layout/Link';
import IdeaVote from '../shared/idea/Vote';
import { User } from '../User';

function IdeaCard({ idea }: { idea: Idea.Idea }) {
  const {
    dateAdded,
    id,
    message,
    userId,
    voteCount,
    downvotes,
    upvotes,
    user,
  } = idea;

  return (
    <div className="relative text-on-150">
      <div className="flex items-center w-full">
        <div className="flex w-full">
          <Link
            href={`/idea/${id}`}
            className="flex w-full px-3 py-2 sm:px-4 sm:py-3 sm:ml-3 rounded-xl bg-types-100 border-types-100 group hover:bg-types-150 animate"
          >
            <div className="flex flex-col justify-between w-full pr-4">
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
                <P className="mt-1 text-white">
                  {message.slice(0, 150) + (message.length > 150 ? '...' : '')}
                </P>
              </div>
            </div>
            <IdeaVote idea={idea} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;
