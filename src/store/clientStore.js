import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useClientStore = create(
  persist(
    (set, get) => ({
      clients: [],
      nextId: 1,
      addClient: (client) =>
        set((state) => ({
          clients: [
            ...state.clients,
            {
              ...client,
              id: state.nextId,
              createdAt: client.createdAt || new Date().toISOString(),
            },
          ],
          nextId: state.nextId + 1,
        })),
      deleteClient: (id) =>
        set((state) => ({
          clients: state.clients.filter((client) => client.id !== id),
        })),
    }),
    {
      name: 'client-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useClientStore;
