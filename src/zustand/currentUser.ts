import { Tables } from './../api/supabase/supabase';
import { create } from 'zustand';

interface CurrentUserStore {
  currentUser: Tables<'users'> | null;
  setCurrentUser: (changedCurrentUser: Tables<'users'> | null) => void;
}

const useCurrentUserStore = create<CurrentUserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (changedCurrentUser) => set({ currentUser: changedCurrentUser }),
}));

export default useCurrentUserStore;

// const { isLoading, data: currentUser, isError } = useQuery(['currentUser', userId], () => getCurrentUser(userId as string));
