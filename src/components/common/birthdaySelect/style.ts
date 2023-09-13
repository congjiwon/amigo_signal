import styled from 'styled-components';

type statusProps = {
  $birthdayStatus?: boolean;
};

export const SelectorBox = styled.div<statusProps>`
  & .ant-select-selector {
    border-color: ${(props) => {
      const { $birthdayStatus } = props;
      return $birthdayStatus === undefined ? '#E3E9F3 !important' : $birthdayStatus === false ? '#f00 !important' : '#121621 !important';
    }};
  }
`;
