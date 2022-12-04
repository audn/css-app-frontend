import create from 'zustand';

type Store = {
  library: string;
  version: string;
};
const useMainState = create<Store>(() => ({
  library: 'TailwindCSS',
  version: '3.2.4',
}));

export default useMainState;
