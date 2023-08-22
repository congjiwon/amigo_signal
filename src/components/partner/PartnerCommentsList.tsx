import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getPartnerComments } from './Partner';
import PartnerCommentsWrite from './PartnerCommentsWrite';

// type PartnerCommentsProps = {
//   // item: IPartnerComment;
//   content: string;
// };
// props: PartnerCommentsProps

const PartnerCommentsList = () => {
  const queryClient = useQueryClient();
  const queryKey = ['partnerComments'];
  const [prevComment, setPrevComment] = useState('');
  const { isLoading: getIsLoading, isError: getIsError, data } = useQuery(queryKey, getPartnerComments);

  // const { isLoading: fixIsLoading, isError: fixIsError } = useMutation(updatePartnerComments, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(queryKey);
  //   },
  // });
  // const mutation = useMutation(deletePartnerComments, {
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries(queryKey);
  //   },
  // });

  // 다른걸 리턴할 필요가 없으니까 그냥 이거자체를 리턴.
  // 지금 getIsError 상태.
  if (getIsLoading || getIsError) {
    // if (getIsLoading || getIsError || mutation.isLoading || mutation.isError || fixIsLoading || fixIsError) {
    return <div>그렇게 됐다.</div>;
  }

  console.log('data :', data);

  const handleDelBtn = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      // mutation.mutate();
      // deletePartnerComments();
    }
  };

  // input은 계속 있어야하니까,
  // 변수로 상태값만 바꾸고 컴포넌트자체를 바꿀 필요는 없다.
  // const handleFixBtn = (comment: string) => {
  //   setPrevComment(comment);
  // };

  return (
    <div>
      <p>댓글 {data?.length}개</p>
      <PartnerCommentsWrite prevComment={prevComment} />
      {data?.map((comment) => {
        return (
          <div key={comment.id}>
            <div>
              <p>{comment.content}</p>
              <p>{comment.date}</p>
            </div>
            <div>
              {/* <button onClick={() => handleFixBtn(comment.content)}>수정</button> */}
              <button onClick={handleDelBtn}>삭제</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PartnerCommentsList;
