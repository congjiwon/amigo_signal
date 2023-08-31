import { Link } from 'react-router-dom';
import * as StCommon from '../style/style';
import { Tables } from '../../../../api/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import { getSpotShareDefaultImg } from '../../../../api/supabase/partner';

type SpotSharePorps = {
  spotSharePost: Tables<'spotPosts'>;
};

export default function MySpotShareCard({ spotSharePost }: SpotSharePorps) {
  const textContent = spotSharePost.content.replace(/<\/?[^>]+(>|$)/g, '');

  const { data: flagData, isLoading, isError } = useQuery(['flags', spotSharePost.id], () => getSpotShareDefaultImg(spotSharePost.country));

  const countryImg = flagData?.data!.map((item) => item.imageUrl)[0];

  return (
    <StCommon.MyCard className="spot-share">
      <Link to={`/spotshare/detail/${spotSharePost.id}`}>
        <StCommon.PaddingBox>
          <StCommon.DateInfo>{spotSharePost.visitDate}</StCommon.DateInfo>
          <StCommon.CardTitle className="spot-title">{spotSharePost.title}</StCommon.CardTitle>
          <StCommon.ContentEllipsis>{textContent}</StCommon.ContentEllipsis>
        </StCommon.PaddingBox>

        <StCommon.BgCountryBox $countryBg={countryImg!}>
          <StCommon.BadgeCountry>{spotSharePost.country}</StCommon.BadgeCountry>
        </StCommon.BgCountryBox>
      </Link>
    </StCommon.MyCard>
  );
}
