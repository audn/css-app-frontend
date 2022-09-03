import Router from 'next/router';
import { SyntheticEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Idea } from '../../../../lib/interfaces';
import { useAuthState } from '../../../../lib/store/auth';
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
  }, [isLoggedIn, currentUser]);

  async function handleUpvote(e: SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isLoggedIn) {
      const { error, payload } = await onUpvoteIdea(idea!.id);
      if (!error) {
        setDownvoted(false);
        setUpvoted(!upvoted);
        if (upvoted) {
          removeUserState('upvotedIdeas');
        } else {
          removeUserState('downvotedIdeas');
          addUserState('upvotedIdeas');
        }
        setVotes(payload?.results || 0);
      }
    } else
      Router.push(
        `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=dTdacThkLVZER0pCZkZ6SklUTjI6MTpjaQ&redirect_uri=${process.env.NEXT_PUBLIC_API_URL}/auth/twitter/callback&scope=tweet.read%20users.read%20follows.read&state=state&code_challenge=challenge&code_challenge_method=plain`,
      );
  }

  async function handleDownvote(e: SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isLoggedIn) {
      const { error, payload } = await onDownvoteIdea(idea!.id);
      if (!error) {
        setUpvoted(false);
        setDownvoted(!downvoted);
        if (downvoted) {
          removeUserState('downvotedIdeas');
        } else {
          removeUserState('upvotedIdeas');
          addUserState('downvotedIdeas');
        }
        setVotes(payload?.results || 0);
      } else toast.error('Failed to downvote');
    } else
      Router.push(
        `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=dTdacThkLVZER0pCZkZ6SklUTjI6MTpjaQ&redirect_uri=${process.env.NEXT_PUBLIC_API_URL}/auth/twitter/callback&scope=tweet.read%20users.read%20follows.read&state=state&code_challenge=challenge&code_challenge_method=plain`,
      );
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
