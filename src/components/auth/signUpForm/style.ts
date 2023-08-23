import { styled } from 'styled-components';

type StyledStatusProps = {
  $validationStatusColor: boolean;
};

export const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 60px 0;
`;

export const FormTitle = styled.h2`
  margin-bottom: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;

export const FormRow = styled.div`
  margin-bottom: 16px;
`;

export const ValidationMsgBox = styled.div<StyledStatusProps>`
  height: 22px;
  margin-top: 8px;
  font-size: 14px;
  color: ${(props) => (props.$validationStatusColor ? 'green' : 'red')};
`;

export const GenderRow = styled.div`
  display: flex;
  align-items: center;

  & span {
    margin-right: 16px;
  }

  & input[type='radio'] {
    margin: 0 6px;
  }
`;
