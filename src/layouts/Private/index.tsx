import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppShell, Burger, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { PrivateMenu, UserDropdown } from '@/components/__commons';
import { PrivateLayoutSkeleton } from './skeleton';

import { useAuth } from '@/core/contexts';
import logo from '@/assets/private-logo.png';
import classes from './styles.module.css';

export function PrivateLayout() {
  const [opened, { toggle }] = useDisclosure();
  const { user, authenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated || user === null) {
      navigate('/login');
    }
  }, [user, authenticated, navigate]);

  return (
    <AppShell
      header={{ height: { base: 60, md: 96 } }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" justify="space-between" pr="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div style={{ backgroundColor: '#547B9A' }} className={classes.logo}>
            <Image src={logo} w={70} />
          </div>
          <UserDropdown />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p={0}>
        <PrivateMenu />
      </AppShell.Navbar>
      <AppShell.Main bg="gray.1">
        <Suspense fallback={<PrivateLayoutSkeleton />}>
          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
}
