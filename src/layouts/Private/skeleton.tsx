import { Grid, Skeleton, Stack } from '@mantine/core';

export function PrivateLayoutSkeleton() {
  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Skeleton h={60} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Skeleton h={60} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Skeleton h={60} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Skeleton h={60} />
        </Grid.Col>
      </Grid>
      <Stack gap="md" mt="xl">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={40} />
          ))}
      </Stack>
    </>
  );
}
