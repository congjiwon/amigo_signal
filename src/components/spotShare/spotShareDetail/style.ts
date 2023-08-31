import { styled } from 'styled-components';

export const WriterInfoBox = styled.div`
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

export const ButtonBox = styled.div`
  margin: 33px 33px 0px 0px;
  text-align: right;
  span {
    margin-left: 11px;
  }
`;

export const TitleBox = styled.div`
  border: 2px solid #efefef;
  border-radius: 50px;
  margin-bottom: 29px;
  height: 51px;
  p {
    font-size: 18px;
    margin: 19px 0 12px 57px;
  }
`;

export const InfoBox = styled.div`
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
