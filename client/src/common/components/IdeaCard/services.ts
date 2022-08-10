import { deleteIdea, upvoteIdea } from '../../utils/hooks/api/ideas';

export async function onDeleteIdea(id: string) {
  const { error } = await deleteIdea(id);
  if (!error) {
    console.log('success');
  }
}

export async function onUpvoteIdea({
  id,
  upvoted,
  setVotes,
  setUpvoted,
  votes,
}: {
  id: string;
  upvoted: boolean;
  votes: number;
  setVotes: (val: number) => void;
  setUpvoted: (val: boolean) => void;
}) {
  const { error } = await upvoteIdea(id);

  if (!error) {
    if (upvoted) {
      setVotes(votes - 1);
    } else setVotes(votes + 1);

    setUpvoted(!upvoted);
  }
}
