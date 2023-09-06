import { create } from 'zustand';

interface MyPageTabPanel {
  active: boolean[];
  setActive: (index: number, status: boolean) => void;
}

const useMyPageTabPanel = create<MyPageTabPanel>((set) => ({
  // [동행찾기 작성글, 동행찾기 참여글, 동행찾기 북마크, 스팟공유 작성글, 스팟공유 좋아요] 순
  // [MyPartnerPost, AppliedPosts, ]
  active: [true, false, false, false, false, false],
  setActive: (index, status) =>
    set((state) => {
      const newActive = state.active.map((item) => (item = false));
      newActive[index] = true;
      return { active: newActive };
    }),
}));

export default useMyPageTabPanel;
