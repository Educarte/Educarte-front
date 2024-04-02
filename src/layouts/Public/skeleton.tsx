import { Center, Skeleton } from '@mantine/core';

export function PublicLayoutSkeleton() {
  return (
    <Center h="100%">
      <Skeleton h="250px" maw="350px" />
    </Center>
  );
}
