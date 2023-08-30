import styled from 'styled-components';

type StatusProps = {
  isOpen: boolean;
};

//탑버튼
export const MoveButtonArea = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 1200px;
  height: 400px;
  overflow: hidden;
`;

export const MainImage = styled.img`
  position: absolute;
  width: 100%;
  /* width: 1920px; */
  transform: translate(0%, -20%);
`;

export const ImageMainText = styled.span`
  position: absolute;
  bottom: 55%;
  left: 5%;
  color: black;
  font-size: 1.4rem;
  font-weight: bold;
`;

export const ImageSubText = styled.span`
  position: absolute;
  bottom: 45%;
  left: 5%;
  color: black;
  font-size: 0.8rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, auto));
  grid-gap: 20px;
  place-items: center;
  margin: 50px auto;

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(200px, auto));
  }

  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(2, minmax(200px, auto));
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, minmax(200px, auto));
  }
`;

export const PostCard = styled.div`
  width: 210px;
  height: 210px;
  padding: 20px;
  padding-bottom: 15px;
  border-radius: 20px;
  box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.2);
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FlagBox = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

export const FlagImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  p {
    font-size: 0.8rem;
    margin-bottom: 10px;
  }
`;

export const TravelDate = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
  p {
    margin-top: 3px;
  }
`;

export const TitleBox = styled.div`
  width: 200px;
  margin-bottom: 10px;
  h1 {
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Body = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d9d9d9;
  p {
    padding: 7px;
    background-color: lightgray;
    border-radius: 30px;
    font-size: 0.7rem;
  }
`;

export const Status = styled.div<StatusProps>`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: ${(props) => (props.isOpen ? '#FF7000' : '#994504')};
  border-radius: 30px;
  font-size: 0.7rem;
  color: ${(props) => (props.isOpen ? '#000000' : '#ffffff')};
`;

export const InterestImage = styled.img`
  width: 50px;
  height: 50px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 0.8rem;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
