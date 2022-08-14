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
  const currentUser = useAuthState((s) => s.user);

  let [votes, setVotes] = useState<number>(idea?.voteCount || 0);
  let [upvoted, setUpvoted] = useState<boolean>(false);
  let [downvoted, setDownvoted] = useState<boolean>(false);

  useEffect(() => {
    if (idea?.upvotes?.filter((x) => x.user.id === currentUser.id).length) {
      setUpvoted(true);
      setDownvoted(false);
    } else {
      if (
        currentUser.downvotedIdeas?.filter((x) => x.ideaId === idea?.id).length
      ) {
        setDownvoted(true);
      }
      setUpvoted(false);
    }

    setVotes(idea?.voteCount || 0);
  }, [currentUser, idea]);

  async function handleUpvote(e: SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    const success = await onUpvoteIdea(idea!.id);
    if (success) {
      setDownvoted(false);
      if (upvoted) {
        setVotes(votes - 1);
      } else setVotes(votes + 1);
      setUpvoted(!upvoted);
    }
  }

  async function handleDownvote(e: SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    const success = await onDownvoteIdea(idea!.id);
    if (success) {
      setUpvoted(false);
      if (downvoted) {
        setVotes(votes + 1);
        removeDownvoted();
      } else {
        addDownvoted();
        setVotes(votes - 1);
      }

      setDownvoted(!downvoted);
    }
  }
  const removeDownvoted = () => {
    const data = currentUser.downvotedIdeas;
    data.splice(
      currentUser.downvotedIdeas.findIndex((x) => x.ideaId === idea.id),
      1,
    ),
      useAuthState.setState({
        user: {
          ...currentUser,
          downvotedIdeas: [...data],
        },
      });
  };
  const addDownvoted = () => {
    useAuthState.setState({
      user: {
        ...currentUser,
        downvotedIdeas: [
          ...currentUser.downvotedIdeas,
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
  return (
    <VoteWrapper>
      <VoteDetails votes={votes} />
      <VoteIcons>
        <Upvote
          onClick={handleUpvote}
          active={upvoted}
          key={`${idea?.id}_upvote`}
        />
        <Downvote
          onClick={handleDownvote}
          active={downvoted}
          key={`${idea?.id}_downvote`}
        />
      </VoteIcons>
    </VoteWrapper>
  );
}

export default IdeaVote;
