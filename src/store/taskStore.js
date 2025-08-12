import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      nextId: 1,

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: state.nextId,
            },
          ],
          nextId: state.nextId + 1,
        })),

      updateTaskStatus: (id, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
);

export default useTaskStore;
