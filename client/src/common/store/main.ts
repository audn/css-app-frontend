import create from 'zustand';

type Store = {
  library: string;
  version: string;
  src: string;
};
const useMainState = create<Store>(() => ({
  library: 'TailwindCSS',
  version: 'v.3.2.0',
  src: "<script src='https://cdn.tailwindcss.com/3.2.4%27%3E</script>",
}));

export default useMainState;
