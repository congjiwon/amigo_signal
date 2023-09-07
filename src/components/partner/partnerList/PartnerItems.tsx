import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { getPartnerPosts } from '../../../api/supabase/partner';
import SkeletonList from '../../common/Skeleton/SkeletonList';
import TopButton from '../../common/topbutton/TopButton';
import PartnerItem from './PartnerItem';
import * as St from './style';
import icon_nodata from '../../../assets/imgs/NoData/icon_nodata.png';

type PartnerItemsProps = {
  isOpen?: boolean;
  country?: string;
  startDate?: string;
  endDate?: string;
};

export default function PartnerItems({ isOpen, country, startDate, endDate }: PartnerItemsProps) {
  const observerElem = useRef<HTMLDivElement | null>(null);

  const {
    data: infiniteData,
    isLoading: infiniteDataLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['PartnerPostsList', isOpen, country, startDate, endDate],
    queryFn: async ({ pageParam = 0 }) => {
      return getPartnerPosts({ isOpen, country, startDate, endDate, page: pageParam });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data && lastPage.data.length !== 0) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    const element = observerElem.current;
    const option = { threshold: 0 };

    if (element) {
      const observer = new IntersectionObserver(handleObserver, option);
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [fetchNextPage, hasNextPage, handleObserver]);

  if (infiniteDataLoading) {
    return <SkeletonList />;
  }

  if (infiniteData?.pages[0].data?.length === 0) {
    return (
      <St.NoDataImgBox>
        <img src={icon_nodata} style={{ width: '60px' }}></img>
        <p>검색결과가 없습니다!</p>
      </St.NoDataImgBox>
    );
  }

  return (
    <>
      <St.Grid>
        {infiniteData?.pages
          .flatMap((page) => page.data)
          .filter((post) => post !== null && post !== undefined)
          .map((post) => (
            <PartnerItem key={post!.id} post={post!} />
          ))}
        <St.MoveButtonArea>
          <TopButton />
        </St.MoveButtonArea>
      </St.Grid>
      <div className="loader" ref={observerElem}>
        {isFetchingNextPage && hasNextPage && 'Loading...'}
      </div>
    </>
  );
}
