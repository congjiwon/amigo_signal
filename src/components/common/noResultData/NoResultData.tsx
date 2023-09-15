import { styled } from 'styled-components';
import icon_nodata from '../../../assets/imgs/NoData/icon_nodata.png';

function NoResultData() {
  return (
    <NoDataLayout>
      <img style={{ width: '60px', height: '60px' }} src={icon_nodata} alt="데이터 없음 아이콘" />
    </NoDataLayout>
  );
}

export default NoResultData;

const NoDataLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
