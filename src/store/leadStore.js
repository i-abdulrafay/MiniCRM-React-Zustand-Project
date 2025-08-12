import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLeadStore = create(
  persist(
    (set, get) => ({
      leads: [],
      nextId: 1,

      addLead: (lead) =>
        set((state) => ({
          leads: [
            ...state.leads,
            {
              ...lead,
              id: state.nextId,
              createdAt: lead.createdAt || new Date().toISOString(),
            },
          ],
          nextId: state.nextId + 1,
        })),

      updateLead: (id, updatedLead) =>
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id ? { ...lead, ...updatedLead } : lead
          ),
        })),

      deleteLead: (id) =>
        set((state) => ({
          leads: state.leads.filter((lead) => lead.id !== id),
        })),

      moveLead: (id, newStatus) =>
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id ? { ...lead, status: newStatus } : lead
          ),
        })),
    }),
    {
      name: 'lead-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useLeadStore;
