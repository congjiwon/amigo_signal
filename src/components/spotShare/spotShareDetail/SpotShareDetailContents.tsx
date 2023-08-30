import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { deleteSpotSharePost, getDetailSpotSharePost } from '../../../api/supabase/spotshare';
import { useNavigate, useParams } from 'react-router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { styled } from 'styled-components';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import useSessionStore from '../../../zustand/store';
import { ConfirmDelete } from '../../common/modal/alert';

type postIdProps = {
  postId: string | undefined;
};

function SpotShareDetailContents() {
  const { postid } = useParams<string>();
  const [like, setLike] = useState(false);
  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 게시글 삭제
  const mutation = useMutation(deleteSpotSharePost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['spotSharePost']);
    },
  });

  const deletePostHandle = async (id: string | undefined) => {
    const isConfirmed = await ConfirmDelete('해당 글이 삭제되었습니다.');
    if (!isConfirmed) {
      return;
    }
    mutation.mutate(id);
    navigate('/spotshare');
  };

  // 디테일 포스트 불러오기
  const { data: spotSharePost, isLoading, isError } = useQuery(['spotSharePost', postid], () => getDetailSpotSharePost(postid));
  const spotSharePostData = spotSharePost?.data![0];
  console.log('해당글 데이터 모음', spotSharePostData);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  // 글 작성자인지 확인하는 함수
  const isPostWriter = () => logInUserId == spotSharePostData?.writerId;

  return (
    <>
      <TitleBox>
        <p>제목: {spotSharePostData?.title}</p>
      </TitleBox>
      <InfoBox>
        <span>{spotSharePostData?.region}</span>
        <span>{spotSharePostData?.country}</span>
        <span>방문날짜: {spotSharePostData?.visitDate}</span>
        <span>{spotSharePostData?.starRate}</span>
      </InfoBox>
      <SpotShareBox>
        <ButtonBox>
          <span>{like ? <RiHeartFill style={{ height: '22px', width: '22px' }} /> : <RiHeartLine style={{ height: '22px', width: '22px' }} />}</span>
          {isPostWriter() ? (
            <>
              <span>{<FiEdit style={{ height: '22px', width: '22px' }} />}</span>
              <span>{<FiTrash2 onClick={() => deletePostHandle(spotSharePostData?.id)} style={{ height: '22px', width: '22px' }} />}</span>
            </>
          ) : (
            ''
          )}
        </ButtonBox>
        <ReactQuill readOnly={true} theme="bubble" value={spotSharePostData?.content} />
        <WriterInfoBox>
          <span>작성자: 작성자 정보 안들어가있어요 </span>
          <span>작성시간: 작성시간 안들어가있어요 </span>
        </WriterInfoBox>
      </SpotShareBox>
    </>
  );
}

export default SpotShareDetailContents;
const WriterInfoBox = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  text-align: right;
  margin: 0px 47px 47px 0px;
  span {
    font-size: 13px;
    margin-left: 10px;
  }
`;

const ButtonBox = styled.div`
  margin: 33px 33px 0px 0px;
  text-align: right;
  span {
    margin-left: 11px;
  }
`;

const TitleBox = styled.div`
  border: 2px solid #efefef;
  border-radius: 50px;
  margin-bottom: 29px;
  height: 51px;
  p {
    font-size: 18px;
    margin: 19px 0 12px 57px;
  }
`;

const InfoBox = styled.div`
  height: 51px;
  span {
    margin-right: 20px;
    border: 2px solid #efefef;
    border-radius: 50px;
    padding: 11px 35px;
  }
`;

export const SpotShareBox = styled.div`
  & strong {
    font-weight: 700;
  }

  & em {
    font-style: italic;
  }
  border: 2px solid #efefef;
  border-radius: 10px;
  padding-left: 37px;
  padding-bottom: 130px;
  position: relative;
`;