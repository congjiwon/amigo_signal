import { Rate } from 'antd';
import React from 'react';

interface StarProps {
  setStar: React.Dispatch<React.SetStateAction<number>>;
}
interface UpdateStarProps {
  star: number;
  setStar: React.Dispatch<React.SetStateAction<number>>;
}

function StarRate({ setStar }: StarProps) {
  return <Rate className="StarRate" defaultValue={5} onChange={setStar} />;
}

export function UpdateStarRate({ star, setStar }: UpdateStarProps) {
  return <Rate className="UpdateStarRate" defaultValue={star} onChange={setStar} />;
}

export default StarRate;
