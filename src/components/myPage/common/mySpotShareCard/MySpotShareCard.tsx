import { Link } from 'react-router-dom';
import * as StCommon from '../style/style';

type SpotSharePorps = {
  spotSharePost: {
    address: string | null;
    content: string;
    country: {
      country: string;
      imageUrl: string;
    };
    createdAt: string;
    id: string;
    latitude: number | null;
    longitude: number | null;
    likeCount?: number;
    postImageUrl: string[] | null;
    region: string;
    starRate: number;
    title: string;
    visitDate: string;
    writerId: string;
    users?: {
      birthday: string;
      email: string;
      gender: string;
      id: string;
      nickName: string;
      profileImageUrl: string | null;
    };
  };
};

export default function MySpotShareCard({ spotSharePost }: SpotSharePorps) {
  const textContent = spotSharePost.content.replace(/<\/?[^>]+(>|$)/g, '');

  return (
    <StCommon.MyCard className="spot-share">
      <Link to={`/spotshare/detail/${spotSharePost.id}`}>
        <StCommon.PaddingBox>
          <StCommon.DateInfo>{spotSharePost.visitDate}</StCommon.DateInfo>
          <StCommon.CardTitle className="spot-title">{spotSharePost.title}</StCommon.CardTitle>
          <StCommon.ContentEllipsis>{textContent}</StCommon.ContentEllipsis>
        </StCommon.PaddingBox>

        <StCommon.BgCountryBox>
          <StCommon.BgCountryImg src={`${spotSharePost.country.imageUrl}`} alt="" />
          <StCommon.BadgeCountry>{spotSharePost.country.country}</StCommon.BadgeCountry>
        </StCommon.BgCountryBox>
      </Link>
    </StCommon.MyCard>
  );
}
