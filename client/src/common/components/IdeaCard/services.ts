import {
  deleteIdea,
  downvoteIdea,
  upvoteIdea,
} from '../../utils/hooks/api/ideas';

export async function onDeleteIdea(id: string) {
  const { error } = await deleteIdea(id);
  if (!error) {
    console.log('success');
  }
}
export async function onUpvoteIdea(id: string) {
  const { error } = await upvoteIdea(id);

  return !error;
}

export async function onDownvoteIdea(id: string) {
  const { error } = await downvoteIdea(id);

  return !error;
}
