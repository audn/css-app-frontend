import create from 'zustand';

type Store = {
  isCollapsed: boolean;
};
const useSidebarState = create<Store>(() => ({
  isCollapsed: false,
}));

export default useSidebarState;
