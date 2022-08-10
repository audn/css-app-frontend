function Votes({ votes }: { votes: number }) {
  return (
    <span className="p-1 mt-1 -m-1 text-sm font-bold rounded-lg cursor-default peer animate hover:bg-types-150">
      {votes}
    </span>
  );
}

export default Votes;
