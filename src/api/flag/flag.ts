import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const url = `https://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=${API_KEY}&pageNo=1&numOfRows=227`;

export const getFlag = async () => {
  const response = await axios.get(url);
  return response.data.data;
};
