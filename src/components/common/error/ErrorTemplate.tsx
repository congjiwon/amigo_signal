import { useNavigate } from 'react-router-dom';
import file_not_found from '../../../assets/imgs/error/file_not_found.png';
import * as St from './style';

function ErrorTemplate() {
  const navigate = useNavigate();
  return (
    <St.ErrorLayout>
      <St.ErrorContainer>
        <St.ErrorImg src={file_not_found} alt="error img" />
        <St.ErrorDescription>
          <h1>원하시는 페이지를 찾을 수 없습니다!</h1>
          <div>
            <p>찾으시려는 페이지의 주소가 잘못 입력되었거나,</p>
            <p>주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.</p>
            <p>입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.</p>
          </div>
          <St.HomeBtn onClick={() => navigate('/')}>홈으로 이동하기</St.HomeBtn>
        </St.ErrorDescription>
      </St.ErrorContainer>
    </St.ErrorLayout>
  );
}

export default ErrorTemplate;
