import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

interface SessionStore {
  session: Session | null;
  setSession: (newSession: Session | null) => void;
}

const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  setSession: (newSession) => set({ session: newSession }),
}));

export default useSessionStore;
