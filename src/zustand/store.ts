import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

interface SessionStore {
  session: Session | null;
  setSession: (newSession: Session | null) => void;
}

interface ModalStore {
  openedModals: { [key: string]: boolean };
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
}

const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  setSession: (newSession) => set({ session: newSession }),
}));

export default useSessionStore;

export const useModalStore = create<ModalStore>((set, get) => ({
  openedModals: {},
  openModal: (id: string) => {
    const currentModals = get().openedModals;
    set({ openedModals: { ...currentModals, [id]: true } });
  },
  closeModal: (id: string) => {
    const currentModals = get().openedModals;
    set({ openedModals: { ...currentModals, [id]: false } });
  },
}));
