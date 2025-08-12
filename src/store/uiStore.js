import { create } from 'zustand';

const useUIStore = create((set) => ({
  isCollapsed: false,
  toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));

export default useUIStore;
