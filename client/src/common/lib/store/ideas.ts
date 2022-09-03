import create from 'zustand';

type Store = {
  votes: number;
  upvoted: boolean;
  downvoted: boolean;
};

export const useIdeasState = create<Store>(() => ({
  votes: 0,
  upvoted: false,
  downvoted: false,
}));
