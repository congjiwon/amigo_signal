export type allReCommentsData =
  | {
      commentId: string;
      date: string;
      id: string;
      reContent: string;
      writerId: string;
      users: {
        nickName: string;
        profileImageUrl: string | null;
      };
    }[]
  | null
  | undefined;

export type UsersProps =
  | {
      id: string;
      nickName: string;
      profileImageUrl: string | null;
    }[]
  | null
  | undefined;

export type UserProps = {
  id: string;
  nickName: string;
  profileImageUrl: string | null;
};

export type allCommentsProps =
  | {
      content: string;
      id: string;
    }[]
  | null
  | undefined;

export type CommentProps = {
  content: string;
  date: string;
  id: string;
  postId: string | null;
  writerId: string;
};

export type PartnerCommentListProps = {
  users: UsersProps;
  allComments: allCommentsProps;
  allReCommentsData: allReCommentsData;
  comment?: CommentProps;
  isLoginUser: boolean;
};

export type CancelSubmitBoxProps = {
  comment: string;
  handleSubmitBtn: (event: React.FormEvent<HTMLFormElement>) => void;
  handleComment: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setUpdateComment?: React.Dispatch<React.SetStateAction<string>>;
  handleCancelBtn: (name: string) => void;
};

export type DateButtonBoxProps = {
  comment?: CommentProps;
  isLoginUser: boolean;
  handleIsOpenBtn: (name: string, commentId: string, reCommentId: string | null) => void;
};

export type CommentTopBoxProps = {
  user: UserProps;
  storageUrl?: string;
  isPostWriter: boolean;
  comment: CommentProps;
};

export type reCommentProps = {
  id: string;
};

export type PartnerReCommentsProps = {
  comment: reCommentProps;
  storageUrl: string | undefined;
  reCommentId: string;
  reComment:
    | {
        date: string;
        id: string;
        reContent: string;
        users: {
          nickName: string;
          profileImageUrl: string | null;
        };
      }
    | null
    | undefined;
  isPostWriter: boolean;
  isLoginCommentUser: boolean;
  updateReComment: string;
  setUpdateReComment: React.Dispatch<React.SetStateAction<string>>;
  handleCancelBtn: (name: string) => void;
  handleIsOpenBtn: (name: string, commentId: string, reCommentId: string | null) => void;
  handleReSubmitBtn: (event: React.FormEvent<HTMLFormElement>) => void;
};
