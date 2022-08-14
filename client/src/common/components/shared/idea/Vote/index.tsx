import { SyntheticEvent, useEffect, useState } from 'react';
import { useAuthState } from '../../../../../store/auth';
import { Idea } from '../../../../lib/interfaces';
import { onDownvoteIdea, onUpvoteIdea } from '../../../IdeaCard/services';
import Downvote from './components/Downvote';
import Upvote from './components/Upvote';
import VoteDetails from './components/VoteDetails';
import VoteIcons from './components/VoteIcons';
import VoteWrapper from './components/VoteWrapper';

function IdeaVote({ idea }: { idea: Idea.Idea }) {
  const { currentUser, isLoggedIn } = useAuthState((s) => ({
    currentUser: s.user,
    isLoggedIn: s.isLoggedIn,
  }));

  let [votes, setVotes] = useState<number>(idea?.voteCount || 0);
  let [upvoted, setUpvoted] = useState<boolean>(false);
  let [downvoted, setDownvoted] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser.upvotedIdeas?.filter((x) => x.ideaId === idea?.id).length) {
      setUpvoted(true);
      setDownvoted(false);
    } else {
      setUpvoted(false);
      if (
        currentUser.downvotedIdeas?.filter((x) => x.ideaId === idea?.id).length
      ) {
        setDownvoted(true);
      }
    }
  }, [isLoggedIn]);

  async function handleUpvote(e: SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    const { error, payload } = await onUpvoteIdea(idea!.id);
    if (!error) {
      if (downvoted) {
        removeUserState('upvotedIdeas');
      } else {
        addUserState('upvotedIdeas');
        removeUserState('downvotedIdeas');
      }
      setDownvoted(false);
      setUpvoted(!upvoted);
      setVotes(payload?.results || 0);
    }
  }

  async function handleDownvote(e: SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    const { error, payload } = await onDownvoteIdea(idea!.id);
    if (!error) {
      if (downvoted) {
        removeUserState('downvotedIdeas');
      } else {
        addUserState('downvotedIdeas');
        removeUserState('upvotedIdeas');
      }
      setUpvoted(false);
      setDownvoted(!downvoted);
      setVotes(payload?.results || 0);
    }
  }
  const removeUserState = (where: 'downvotedIdeas' | 'upvotedIdeas') => {
    const data = currentUser[where];
    data.splice(
      currentUser[where].findIndex((x) => x.ideaId === idea.id),
      1,
    ),
      useAuthState.setState({
        user: {
          ...currentUser,
          [where]: [...data],
        },
      });
  };
  const addUserState = (where: 'downvotedIdeas' | 'upvotedIdeas') => {
    useAuthState.setState({
      user: {
        ...currentUser,
        [where]: [
          ...currentUser[where],
          {
            id: '',
            ideaId: idea.id,
            userId: currentUser.id,
            createdAt: '',
          },
        ],
      },
    });
  };
  console.log(currentUser);

  return (
    <VoteWrapper>
      <VoteDetails votes={votes} />
      <VoteIcons>
        <Upvote onClick={handleUpvote} active={upvoted} />
        <Downvote onClick={handleDownvote} active={downvoted} />
      </VoteIcons>
    </VoteWrapper>
  );
}

export default IdeaVote;
