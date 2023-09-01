import { create } from 'zustand';
import { Tables } from '../api/supabase/supabase';

type PartnerStatus = '모집중' | '모집완료';
type ApplicantStatus = '참여 신청 중' | '참여 수락됨' | '참여 거절됨' | null;

type StateStore = {
  partnerStatus: PartnerStatus;
  applicantStatus: ApplicantStatus;
  setPartnerStatus: (status: PartnerStatus) => void;
  setApplicantStatus: (status: ApplicantStatus) => void;
};

type ConfirmedListStore = {
  confirmedList: Tables<'applicants'>[];
  addConfirmedApplicant: (applicant: Tables<'applicants'>) => void;
  updatedConfirmedList: (newList: Tables<'applicants'>[]) => void;
};

export const useStateStore = create<StateStore>((set) => ({
  partnerStatus: '모집중',
  applicantStatus: null,
  setPartnerStatus: (status) => set({ partnerStatus: status }),
  setApplicantStatus: (status) => set({ applicantStatus: status }),
}));

export const useConfirmedListStore = create<ConfirmedListStore>((set) => ({
  confirmedList: [],
  addConfirmedApplicant: (applicant) =>
    set((state) => ({
      confirmedList: [...state.confirmedList, applicant],
    })),
  updatedConfirmedList: (newList) =>
    set(() => ({
      confirmedList: newList,
    })),
}));
