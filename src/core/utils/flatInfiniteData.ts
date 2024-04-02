import { InfiniteData } from 'react-query';
import { PaginatedResponse } from '@/core/types';

export default function flatInfiniteData<T>(
  data: InfiniteData<PaginatedResponse<T>> | undefined
): T[] {
  return (
    data?.pages?.reduce<T[]>((acc, curr) => [...acc, ...curr.items], []) || []
  );
}
