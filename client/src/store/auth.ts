import create from 'zustand';
import { User } from '../common/lib/interfaces';

type Store = {
  isLoggedIn: boolean;
  user: User.User;
};

export const useAuthState = create<Store>(() => ({
  isLoggedIn: false,
  user: {
    id: '',
    name: '',
    profile_image_url: '',
    upvotedIdeas: [],
    downvotedIdeas: [],
    username: '',
    verified: false,
    role: 'USER',
  },
}));
