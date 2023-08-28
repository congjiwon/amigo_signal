import { useQuery } from '@tanstack/react-query';
import { getAppliedPosts } from '../../../api/supabase/partner';
import useSessionStore from '../../../zustand/store';
import { useState } from 'react';

export default function AppliedPosts() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);

  const { data: appliedPosts, isLoading, isError } = useQuery(['appliedPosts', userId, filterStatus], () => getAppliedPosts(userId as string));

  const handleClickFilter = (value: boolean | null) => {
    setFilterStatus(value);
  };

  // appliedPosts?.map((post) => post.postId);
  return (
    <div>
      <div>
        <button>대기중</button>
        <button>수락됨</button>
        <button>거절됨</button>
      </div>
      {/* <div>{appliedPosts?.map(item => item.postId)}</div> */}
    </div>
  );
}
