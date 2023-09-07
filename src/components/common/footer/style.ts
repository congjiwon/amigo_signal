import { styled } from 'styled-components';

export const Layout = styled.div`
  border-top: 1px solid #efefef;
  /* position: relative; */
  /* transform: translateY(-100%); */
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* position: absolute; */
  min-height: 200px;
  min-width: 360px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding-left: 100px;
    box-sizing: border-box;
  }

  @media (max-width: 600px) {
    padding-left: 20px;
  }
`;

export const FootLogo = styled.div`
  width: 300px;
  height: 40px;
  margin: 40px 0 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FootTitle = styled.p`
  color: #666;
  font-weight: bold;
`;

export const FootText = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 10px;
`;
