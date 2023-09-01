import { styled } from 'styled-components';

export const IntroWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 600px;
  height: 400px;

  /* background-color: antiquewhite; */
`;

export const LogoDiv = styled.div`
  width: 124px;
  height: 124px;

  background-color: grey;
`;

export const Logo = styled.p`
  font-size: 24px;
  font-weight: bold;

  margin: 18px 0 18px 0;
`;

export const ExplanationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 38px;
`;

export const Span = styled.span`
  color: #5e5b5b;
  margin-bottom: 5px;
`;

export const LinkIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100px;

  margin-bottom: 18px;

  background-color: grey;
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 210px;
  height: 120px;

  /* background-color: aliceblue; */
`;

export const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
