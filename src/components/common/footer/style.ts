import { styled } from 'styled-components';

export const ContainerFooter = styled.footer`
  padding: 20px 0;
  background-color: #efefef;
`;
export const FootTitle = styled.h5`
  color: #666;
  font-weight: bold;
`;
export const FootText = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 5px;
`;
export const FootInfoBox = styled.div`
  margin: 15px 0;
  span {
    a {
      width: 40px;
      height: 40px;
      padding: 10px;
      display: inline-flex;
      background-color: #ddd;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      line-height: 1;
      margin-right: 12px;
      /* 
      &::before {
        content: '';
        width: 15px;
        height: 15px;
        padding: 8px;
        position: absolute;
        top: -1.5px;
        left: -1.5px;
        border-radius: 50%;
        background: linear-gradient(to right top, #879bff, rgba(62, 255, 245, 1));
        transform: scale(0);
      } */
      img {
        filter: invert(99%) sepia(91%) saturate(316%) hue-rotate(177deg) brightness(112%) contrast(73%);
      }
    }

    &:hover a {
      transform: scale(1);
      background: #67bed0;
      transition: 0.3s ease-in-out;
    }
    &:hover img {
      -webkit-filter: brightness(0) invert(1);
      filter: brightness(0) invert(1);
    }
  }
`;
