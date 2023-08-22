const PartnerList = () => {
  // const [imageSrc, setImageSrc] = useState<string>('');
  // // 동행찾기 게시글작성할 때 선택한 country
  // const filteredCountry = '가나';

  // // 국기 api key
  // const API_KEY = process.env.REACT_APP_API_KEY;

  // // 국기 이미지 가져오기
  // const getFlagAndDisplayImage = async (): Promise<void> => {
  //   const url = `https://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=${API_KEY}&pageNo=1&numOfRows=227&cond[country_nm::EQ]=${filteredCountry}`;

  //   const response = await axios.get(url);
  //   const imageUrl = response.data.data[0].download_url;

  //   setImageSrc(imageUrl);
  // };

  // useEffect(() => {
  //   getFlagAndDisplayImage();
  // }, []);

  // // supabase에서 country 가져오기
  // getCountry();

  return (
    <>
      <div>PartnerList</div>
      {/* 국기 이미지 */}
      {/* {imageSrc && <img src={imageSrc} alt="Image" />} */}
    </>
  );
};

export default PartnerList;
