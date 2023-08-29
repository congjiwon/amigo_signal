import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getDetailSpotSharePost } from '../../../api/supabase/spotshare';
import { useParams } from 'react-router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { styled } from 'styled-components';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import useSessionStore from '../../../zustand/store';

type postIdProps = {
  postId: string | undefined;
};

function SpotShareDetailContents() {
  const { postid } = useParams<string>();
  const [like, setLike] = useState(false);
  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;

  console.log('logInUserId', logInUserId);

  // 디테일 포스트 불러오기
  const { data: spotSharePost, isLoading, isError } = useQuery(['partnerPost', postid], () => getDetailSpotSharePost(postid));
  const spotSharePostData = spotSharePost?.data![0];
  console.log('해당글 데이터 모음', spotSharePostData);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

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
          {logInUserId == spotSharePostData?.writerId ? (
            <>
              <span>{<FiEdit style={{ height: '22px', width: '22px' }} />}</span>
              <span>{<FiTrash2 style={{ height: '22px', width: '22px' }} />}</span>
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
