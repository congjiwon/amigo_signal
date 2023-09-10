type AllCommentsProps =
  | {
      content: string;
      id: string;
    }[]
  | null
  | undefined;

type AllReCommentsprops =
  | {
      commentId: string;
      date: string;
      id: string;
      reContent: string;
      writerId: string;
      users: {
        id: string;
        nickName: string;
        profileImageUrl: string | null;
      } | null;
    }[]
  | null
  | undefined;

type CommentProps = {
  content: string;
  date: string | null;
  id: string;
  postId: string | null;
  writerId: string;
};

type UsersProps =
  | {
      id: string;
      nickName: string;
      profileImageUrl: string | null;
    }[]
  | null
  | undefined;

export type SpotCommentListProps = {
  allComments: AllCommentsProps;
  allReCommentsData: AllReCommentsprops;
  comment?: CommentProps;
  isLoginUser: boolean;
  users: UsersProps;
};

type UserProps = {
  id: string;
  nickName: string;
  profileImageUrl: string | null;
};

export type CommentTopBoxProps = {
  user: {
    id: string;
    nickName: string;
    profileImageUrl: string | null;
  };
  storageUrl?: string;
  isPostWriter: boolean;
  comment: CommentProps;
};

export type DateButtonBoxProps = {
  comment?: CommentProps;
  isLoginUser: boolean;
  handleIsOpenBtn: (name: string, id: string | null) => void;
  handleDelBtn: (id: string) => Promise<void>;
};

export type CancelSubmitBoxProps = {
  handleSubmitBtn: (event: React.FormEvent<HTMLFormElement>) => void;
  handleComment: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCancelBtn: (name: string) => void;
  comment: string;
};

export type PartnerReCommentsProps = {
  storageUrl?: string;
  reCommentId: string;
  reComment: {
    date: string;
    id: string;
    reContent: string;
    users: {
      nickName: string;
      profileImageUrl: string | null;
    } | null;
  };
  isPostWriter: boolean;
  isLoginCommentUser: boolean;
  updateReComment: string;
  setUpdateReComment: React.Dispatch<React.SetStateAction<string>>;
  onCancelBtn: (name: string) => void;
  handleIsOpenBtn: (name: string, id: string | null) => void;
  handleReSubmitBtn: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};
