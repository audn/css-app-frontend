import create from 'zustand';

type Store = {
  isCollapsed?: boolean;
  isHoveringCollapsedSidebar?: boolean;
};
const useSidebarState = create<Store>(() => ({
  isCollapsed: false,
  isHoveringCollapsedSidebar: false,
}));

export default useSidebarState;
