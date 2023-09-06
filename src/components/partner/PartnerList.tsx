import { useState } from 'react';
import PartnerBanner from './partnerList/PartnerBanner';
import PartnerItems from './partnerList/PartnerItems';
import PartnerSelect from './partnerList/PartnerSelect';

const PartnerList = () => {
  // const [postStorage, setPostStorage] = useState<Tables<'partnerPosts'>[]>([]);
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);
  const [location, setLocation] = useState<string[]>([]);
  const [date, setDate] = useState<string[]>([]);
  // const divRef = useRef(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const limit = 10;
  // const offset = (currentPage - 1) * limit;
  // const pageLocation = useLocation();

  const country = location[1];
  const startDate = date[0];
  const endDate = date[1];

  // const { data: filteredPost, isLoading } = useQuery(['filteredData'], () => getFilteredPartnerPost({ country: location[1], startDate: date[0], endDate: date[1], isOpen }));

  // 3중 필터 (나라, 기간, 모집여부)
  // useEffect(() => {
  //   if (filteredPost) {
  //     console.log('filteredPost', filteredPost);
  //     setPostStorage(filteredPost);
  //   }
  //   //무한스크롤 옵저버 인식
  //   if (divRef.current) {
  //     observer.observe(divRef.current);
  //   }
  // }, [location, date, isOpen, pageLocation, filteredPost]);

  // const defaultOption = {
  //   root: null,
  //   threshold: 0.5,
  //   rootMargin: '0px',
  // };

  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     if (entries[0].isIntersecting) {
  //       setTimeout(() => {
  //         setCurrentPage((prevPage) => prevPage + 1);
  //       }, 500);
  //     }
  //   },
  //   {
  //     ...defaultOption,
  //   },
  // );

  return (
    <>
      <PartnerBanner />
      <PartnerSelect setIsOpen={setIsOpen} setLocation={setLocation} setDate={setDate} />
      <PartnerItems isOpen={isOpen} country={country} startDate={startDate} endDate={endDate} />
    </>
  );
};

export default PartnerList;
