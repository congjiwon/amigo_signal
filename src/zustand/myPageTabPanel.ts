import { create } from 'zustand';

interface MyPageTabPanel {
  active: boolean[];
  setActive: (index: number, status: boolean) => void;
}

const useMyPageTabPanel = create<MyPageTabPanel>((set) => ({
  // [MyPartnerPost, AppliedPosts, BookmarkedPosts, MySpotShare, LikedSpotShare, ModifyProfile]
  active: [false, false, false, false, false, false],
  setActive: (index, status) =>
    set((state) => {
      const newActive = state.active.map((item) => (item = false));
      newActive[index] = true;
      return { active: newActive };
    }),
}));

export default useMyPageTabPanel;
