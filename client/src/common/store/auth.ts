import create from 'zustand';
import { API } from '../lib/interfaces';

type Store = {
  user: Partial<API.Models.User>;
  isLoggedIn: boolean;
};
const useAuthState = create<Store>(() => ({
  user: {},
  isLoggedIn: false,
}));

export default useAuthState;
