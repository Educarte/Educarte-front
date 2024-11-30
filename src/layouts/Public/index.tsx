import { Suspense, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Anchor, Center, Grid, Image } from '@mantine/core';
import { PublicLayoutSkeleton } from './skeleton';
import { useAuth } from '@/core/contexts';

import logo from '@/assets/logo.png';
import background from '@/assets/background.png';
import { publicRoutes } from '@/core/routes';

export function PublicLayout() {
  const { verifyIfUserIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (verifyIfUserIsAuthenticated() !== null) {
      const path = window.location.pathname;
      if (publicRoutes.children?.find((i) => i?.path === path)) {
        navigate('/app/users');
      }
    }
  }, []);
  return (
    <Grid
      gutter={0}
      styles={{
        root: {
          height: '100vh',
        },
        inner: {
          height: '100%',
          margin: 0,
        },
      }}
    >
      <Grid.Col span={{ base: 12, md: 6 }} bg="primary" p={0}>
        <Center
          h="100%"
          styles={{
            root: {
              backgroundImage: `url(${background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            },
          }}
        >
          <Anchor component={Link} to="/" c="white">
            <Image src={logo} maw={300} />
          </Anchor>
        </Center>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Suspense fallback={<PublicLayoutSkeleton />}>
          <Outlet />
        </Suspense>
      </Grid.Col>
    </Grid>
  );
}
