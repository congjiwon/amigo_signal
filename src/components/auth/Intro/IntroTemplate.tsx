import React from 'react';
import { styled } from 'styled-components';
import * as St from './style';
import { useNavigate } from 'react-router';

function IntroTemplate() {
  const navigate = useNavigate();
  return (
    <St.IntroWrapper>
      <St.Container>
        <St.LogoDiv>로고</St.LogoDiv>
        <St.Logo>Amigo Signal</St.Logo>
        <St.ExplanationContainer>
          <St.Span>Amigo Signal과 함께 여행에 동행할 친구를 찾아보세요.</St.Span>
          <St.Span>여행이 더 즐거워질 거예요.</St.Span>
        </St.ExplanationContainer>
        <St.LinkContainer>
          <St.LinkBox onClick={() => navigate('/partner')}>
            <St.LinkIcon></St.LinkIcon>
            <div>동행 찾기</div>
          </St.LinkBox>
          <St.LinkBox onClick={() => navigate('/spotshare')}>
            <St.LinkIcon></St.LinkIcon>
            <div>스팟 공유</div>
          </St.LinkBox>
        </St.LinkContainer>
      </St.Container>
    </St.IntroWrapper>
  );
}

export default IntroTemplate;
