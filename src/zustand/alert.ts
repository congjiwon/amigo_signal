import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AlertInfo = {
  id: string;
  postId: string;
  title: string;
  date: string;
  genre?: string;
};

type AlertStorageStore = {
  alertStorage: AlertInfo[];
  addAlertStorage: (postInfo: AlertInfo) => void;
  removeAlertStorage: (postId: string) => void;
};

type NewAlertStore = {
  hasNewAlert: boolean;
  setHasNewAlert: (value: boolean) => void;
};

export const useAlertStorageStore = create<AlertStorageStore>()(
  persist(
    (set) => ({
      alertStorage: [],
      addAlertStorage: (postInfo) =>
        set((state) => ({
          alertStorage: [...state.alertStorage, postInfo],
        })),
      removeAlertStorage: (id) =>
        set((state) => ({
          alertStorage: state.alertStorage.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'alertStorage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useNewAlertStore = create<NewAlertStore>()(
  persist(
    (set) => ({
      hasNewAlert: false,
      setHasNewAlert: (value) => set({ hasNewAlert: value }),
    }),
    {
      name: 'hasNewAlert',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
