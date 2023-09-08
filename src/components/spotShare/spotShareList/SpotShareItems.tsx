import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { getFilteredSpotSharePost, getLikes } from '../../../api/supabase/spotshare';
import useSessionStore from '../../../zustand/store';
import SkeletonList from '../../common/Skeleton/SkeletonList';
import TopButton from '../../common/topbutton/TopButton';
import SpotShareItem from './SpotShareItem';
import * as St from './style';
import icon_nodata from '../../../assets/imgs/NoData/icon_nodata.png';

type SpotShareProps = {
  sort?: string;
  country?: string;
  startDate?: string;
  endDate?: string;
};
export default function SpotShareItems({ sort, country, startDate, endDate }: SpotShareProps) {
  const observerElem = useRef<HTMLDivElement | null>(null);

  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;

  const { data } = useQuery(['likes'], getLikes);
  const likeData = data?.data;

  const {
    data: spotShareItems,
    isLoading: spotShareLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['SpotShareList', sort, country, startDate, endDate],
    queryFn: async ({ pageParam = 0 }) => getFilteredSpotSharePost({ sort, country, startDate, endDate, page: pageParam }),
    getNextPageParam: (lastPage) => {
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

  if (spotShareLoading) {
    return <SkeletonList />;
  }

  if (spotShareItems?.pages[0].data?.length === 0) {
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
        {spotShareItems?.pages
          .flatMap((page) => page.data)
          .filter((post) => post !== null && post !== undefined)
          .map((post) => {
            const likedPost = likeData?.filter((like) => {
              return like.userId === logInUserId;
            });
            return <SpotShareItem key={post!.id} post={post!} likedPost={likedPost} />;
          })}

        <St.MoveButtonArea>
          <TopButton />
        </St.MoveButtonArea>
      </St.Grid>
      <div className="loader" ref={observerElem}></div>
    </>
  );
}
