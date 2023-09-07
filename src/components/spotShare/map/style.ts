import { styled } from 'styled-components';

export const SearchAddressBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin-left: 5px;
    background-color: #000;
    border: 0;
    color: #fff;
    padding: 3px 10px;
    border-radius: 2px;
  }

  @media screen and (max-width: 650px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding-left: 16px;
  }
`;

export const SearchAddress = styled.div`
  & .map-search-input {
    padding: 3px 6px;
    font-size: 16px;
  }

  button {
    font-size: 16px;
    padding: 5px 20px;
  }
`;

export const Address = styled.div`
  font-size: 14px;
  color: #777;

  button {
    background-color: #999;
  }
`;
