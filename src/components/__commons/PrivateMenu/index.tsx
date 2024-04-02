import { AppShell } from '@mantine/core';

import { privateRoutes } from '@/core/routes/private.routes';
import { MenuItem } from './MenuItem';

export function PrivateMenu() {
  const menuItems = privateRoutes.children?.filter((route) => route.icon);

  return (
    <>
      <AppShell.Section mt={'md'} grow>
        {menuItems?.map((item) => <MenuItem key={item.path} {...item} />)}
      </AppShell.Section>
    </>
  );
}
