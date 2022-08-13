import { SyntheticEvent } from 'react';
import { Idea } from '../../lib/interfaces';
import { postIdea } from '../../utils/hooks/api/ideas';
import { useHomeState } from './store';

export async function onPostIdea({
  event,
  message,
  ideas,
}: {
  event: SyntheticEvent;
  message: string;
  ideas: Idea.Idea[];
}) {
  event.preventDefault();
  useHomeState.setState({ isPosting: true });

  const { error, payload } = await postIdea({ message });
  if (error) {
    useHomeState.setState({ error });
  }
  if (payload) {
    ideas?.unshift(payload?.results);

    useHomeState.setState({ message: '', ideas, sort: 'date' });
  }
  useHomeState.setState({ isPosting: false });
}
