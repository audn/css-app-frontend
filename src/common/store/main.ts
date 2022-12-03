import create from 'zustand';

type Store = {
  library: string;
  version: string;
  src: string;
};
const useMainState = create<Store>(() => ({
  library: 'TailwindCSS',
  version: '3.2.4',
  src: "<script src='https://cdn.tailwindcss.com/3.2.4'></script>",
}));

export default useMainState;
