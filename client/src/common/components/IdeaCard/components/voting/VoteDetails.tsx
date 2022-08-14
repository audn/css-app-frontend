import concat from '../../../../utils/helpers/concat';

function VoteDetails({
  votes,
  className,
}: {
  votes: number;
  className?: string;
}) {
  if (votes !== 0) {
    return (
      <div className={'flex items-center justify-center text-on-100'}>
        <span
          className={concat(
            className ? className : '',
            'text-sm font-bold rounded-lg cursor-default mt-1',
          )}
        >
          {votes}
        </span>
      </div>
    );
  } else return <></>;
}

export default VoteDetails;
