import { Suspense, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Anchor, BackgroundImage, Center, Grid, Image } from '@mantine/core';
import { PublicLayoutSkeleton } from './skeleton';
import { useAuth } from '@/core/contexts';

import logo from '@/assets/logo.png';
import background from '@/assets/background.png';

export function PublicLayout() {
  const { user, authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated || user !== null) {
      navigate(-1);
    }
  }, [user, authenticated, navigate]);

  return (
    <Grid
      styles={{
        root: {
          height: '100%',
        },
        inner: {
          height: '100%',
          margin: 0,
        },
      }}
    >
      <Grid.Col span={{ base: 12, md: 6 }} bg="primary" p={0}>
        <BackgroundImage style={{ opacity: '0.79' }} h="100%" src={background}>
          <Center h="100%">
            <Anchor component={Link} to="/" c="white">
              <Image opacity={'1'} w={'15rem'} src={logo} />
            </Anchor>
          </Center>
        </BackgroundImage>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Suspense fallback={<PublicLayoutSkeleton />}>
          <Outlet />
        </Suspense>
      </Grid.Col>
    </Grid>
  );
}
