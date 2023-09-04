import { Rate } from 'antd';
import React from 'react';

interface StarProps {
  star: number;
  setStar: React.Dispatch<React.SetStateAction<number>>;
}
interface UpdateStarProps {
  star: number;
  setStar: React.Dispatch<React.SetStateAction<number>>;
}

function StarRate({ star, setStar }: StarProps) {
  return <Rate value={star} onChange={setStar} />;
}

export function UpdateStarRate({ star, setStar }: UpdateStarProps) {
  return <Rate defaultValue={star} onChange={setStar} />;
}

export default StarRate;
