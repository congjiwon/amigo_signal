import { useNavigate, useParams } from 'react-router';
import Button from '../components/common/button/Button';
import MetaTags from '../components/common/metaTags/MetaTags';
import SpotComments from '../components/spotShare/spotComment/SpotComments';
import SpotShareDetailContents from '../components/spotShare/spotShareDetail/SpotShareDetailContents';
import { BtnStyleType } from '../types/styleTypes';
import * as St from './style';

function SpotShareDetail() {
  const { postid } = useParams<string>();
  const navigate = useNavigate();

  return (
    <>
      <MetaTags
        title="스팟 공유 상세 | Amigo Signal"
        ogTitle="Amigo Signal"
        ogUrl={`https://amigo-signal.com/spotshare/detail/${postid}`}
        ogDescription="스팟 공유 내용을 확인하세요."
        ogImage="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        ogImageWidth="1200"
        ogImageHeight="630"
      />{' '}
      <SpotShareDetailContents />
      <SpotComments />
      <St.ButtonBox>
        <Button styleType={BtnStyleType.BTN_GOTOLIST} onClick={() => navigate('/spotshare')}>
          목록보기
        </Button>
      </St.ButtonBox>
    </>
  );
}

export default SpotShareDetail;
