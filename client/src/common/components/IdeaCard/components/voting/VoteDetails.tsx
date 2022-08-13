import concat from '../../../../utils/helpers/concat';

function VoteDetails({
  votes,
  className,
}: {
  votes: number;
  className?: string;
}) {
  return (
    <div className={'flex items-center justify-center'}>
      <span
        className={concat(
          className ? className : '',
          'text-sm font-bold rounded-lg cursor-default mt-1',
        )}
      >
        {votes}
      </span>
      {/* <VotesPeer /> */}
    </div>
  );
}

export default VoteDetails;
