import create from 'zustand';

type Store = {
  library: string;
  version: string;
};
const useFilterState = create<Store>(() => ({
  library: 'CSS3',
  version: '',
}));

export default useFilterState;
