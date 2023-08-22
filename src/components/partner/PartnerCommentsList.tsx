import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePartnerComments, getPartnerComments } from './Partner';
import PartnerCommentsWrite from './PartnerCommentsWrite';

// type PartnerCommentsProps = {
//   // item: IPartnerComment;
//   content: string;
// };
// props: PartnerCommentsProps

const PartnerCommentsList = () => {
  const queryClient = useQueryClient();
  const queryKey = ['partnerComments'];
  const { isLoading: getIsLoading, isError: getIsError, data } = useQuery(queryKey, getPartnerComments);
  const { isLoading: delIsLoading, isError: delIsError } = useMutation(queryKey, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
    },
  });

  if (getIsLoading || getIsError || delIsLoading || delIsError) {
    return <div>그렇게 됐다.</div>;
  }

  const handleDelBtn = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      // deletePartnerComments.mutate(id넣어);
      deletePartnerComments();
    }
  };

  return (
    <div>
      <p>댓글 {data?.length}개</p>
      <PartnerCommentsWrite />
      {data?.map((comment) => {
        return (
          <div key={comment.id}>
            <div>
              <p>{comment.content}</p>
              <p>{comment.date}</p>
            </div>
            <div>
              <button onClick={handleDelBtn}>삭제</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PartnerCommentsList;
