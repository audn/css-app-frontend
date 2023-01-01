import create from 'zustand';

type Store = {
  library: string;
  version: string;
};
const useFilterState = create<Store>(() => ({
  library: 'CSS3',
  version: '3.2.4',
}));

export default useFilterState;
