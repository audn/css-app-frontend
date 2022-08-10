import create from 'zustand';
import { Idea } from '../../lib/interfaces';

type Store = {
  isPosting: boolean;
  message: string;
  error: string;
  ideas: Idea.Idea[];
  sort: Idea.SortBy;
};

export const useHomeState = create<Store>(() => ({
  error: '',
  ideas: [],
  isPosting: false,
  message: '',
  sort: 'date',
}));
