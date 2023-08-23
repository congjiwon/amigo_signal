import { create } from 'zustand';

interface BirthdayStore {
  birthday: string;
  setBirthday: (date: string) => void;
}

const useBirthdayStore = create<BirthdayStore>((set) => ({
  birthday: '',
  setBirthday: (date) => set({ birthday: date }),
}));

export default useBirthdayStore;
