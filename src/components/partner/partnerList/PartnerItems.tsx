import { useQuery } from '@tanstack/react-query';
import { getPartnerPosts } from '../../../api/supabase/partner';
import SkeletonList from '../../common/Skeleton/SkeletonList';
import TopButton from '../../common/topbutton/TopButton';
import PartnerItem from './PartnerItem';
import * as St from './style';

type PartnerItemsProps = {
  isOpen?: boolean;
  country?: string;
  startDate?: string;
  endDate?: string;
};

export default function PartnerItems({ isOpen, country, startDate, endDate }: PartnerItemsProps) {
  const { data, isLoading } = useQuery(['PartnerPostsList', isOpen, country, startDate, endDate], () => getPartnerPosts({ isOpen, country, startDate, endDate }));

  if (isLoading) {
    return <SkeletonList />;
  }

  return (
    <>
      <St.Grid>
        {data?.data &&
          data.data.map((post) => {
            return <PartnerItem key={post.id} post={post} />;
          })}
        {/* <div ref={divRef}></div> */}
        <St.MoveButtonArea>
          <TopButton />
        </St.MoveButtonArea>
      </St.Grid>
    </>
  );
}
