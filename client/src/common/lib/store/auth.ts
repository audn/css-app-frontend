import create from 'zustand';
import { User } from '../interfaces';

type Store = {
  isLoggedIn: boolean;
  user: User.User;
};

export const useAuthState = create<Store>(() => ({
  isLoggedIn: false,
  user: {
    id: '',
    ideas: [],
    name: '',
    profile_image_url: '',
    upvotedIdeas: [],
    downvotedIdeas: [],
    username: '',
    verified: false,
    role: 'USER',
  },
}));
