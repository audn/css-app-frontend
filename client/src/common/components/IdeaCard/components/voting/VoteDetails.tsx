import VotesPeer from './Upvote/component/VotesPeer';

function VoteDetails({ votes }: { votes: number }) {
  return (
    <div className="flex items-center justify-center">
      <span className="p-1 mt-1 -m-1 text-sm font-bold rounded-lg cursor-default peer animate hover:bg-types-150">
        {votes}
      </span>
      <VotesPeer />
    </div>
  );
}

export default VoteDetails;
