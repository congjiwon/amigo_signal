import { styled } from 'styled-components';

export const SearchAddressBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  button {
    margin-left: 5px;
    background-color: #000;
    border: 0;
    color: #fff;
    padding: 3px 10px;
    border-radius: 2px;
  }
  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const SearchAddress = styled.div`
  min-width: 384px;
  & .map-search-input {
    padding: 3px 6px;
    font-size: 16px;
  }
  @media (max-width: 1256px) {
    padding: 0px 50px 0px 50px;
  }
  @media (max-width: 809px) {
    text-align: end;
  }
  @media (max-width: 500px) {
    padding: 0px 20px 0px 20px;
  }

  input {
    width: 237.94px;
    height: 24px;
    padding: 8px 12px;
    margin-right: 3.06px;
    border-radius: 6px;
    border: 1px solid var(--light-gray, #e3e9f3);
    font-size: 14px;
    @media (max-width: 500px) {
      width: 196px;
    }
  }

  button {
    width: 112px;
    height: 40px;
    padding: 6.4px 15px;
    background: var(--light-gray, #e3e9f3);
    border-radius: 6px;
    font-size: 14px;
    color: black;
    cursor: pointer;
    @media (max-width: 809px) {
      width: 105px;
    }
  }
`;

export const Address = styled.div`
  display: flex;
  text-align: end;
  align-items: center;
  flex-shrink: 0;
  font-size: 14px;
  color: #777;
  @media (max-width: 1256px) {
    padding: 0px 50px 0px 50px;
  }

  @media (max-width: 500px) {
    padding: 0px 20px 0px 20px;
  }
  p {
    width: 350px;
    @media (max-width: 1020px) {
      width: 230px;
    }
  }
  button {
    height: 30px;
    background-color: #999;
  }
`;

export const AddressSearchBox = styled.div`
  margin-top: 40px;
`;
