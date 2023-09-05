import React from 'react';
import icon_nodata from '../../../assets/imgs/NoData/icon_nodata.png';
import { styled } from 'styled-components';

function NoResultData() {
  return (
    <NoDataLayout>
      <img style={{ width: '60px', height: '60px' }} src={icon_nodata} />
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
