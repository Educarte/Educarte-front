import { useState } from 'react';
import { Button, Center, Portal, Stack } from '@mantine/core';
import { PageContainer } from '@/components/__commons';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { MenusFilters } from '@/components/Menu/Filters';
import { MenuList } from '@/components/Menu/List';
import { useMenus } from '@/core/domain/menu/menu.hooks';
import { ListMenusQuery, Menus } from '@/core/domain/menu/menu.types';
import { RiAddLine } from 'react-icons/ri';
import { MenuModal } from '@/components/Menu/Modal';

export default function MenuPage() {
  const [selected, setSelected] = useState<Menus>();
  const [opened, { open, close }] = useDisclosure(false);
  const [params, setParams] = useState<ListMenusQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data, isLoading } = useMenus(debounced);

  return (
    <Stack gap="md">
      <MenusFilters onChange={setParams} />
      <PageContainer
        title="Cardápio"
        description="Gerencie todos os cardápios da plataforma"
        rightSection={
          <Button variant="filled" onClick={() => open()}>
            <Center>
              <RiAddLine style={{ marginRight: '0.5em' }} />
              Novo Cardápio
            </Center>
          </Button>
        }
      >
        <MenuList
          data={data}
          loading={isLoading}
          onPaginate={(page) => setParams((params) => ({ ...params, page }))}
        />
      </PageContainer>
      <Portal>
        <MenuModal
          menus={selected}
          opened={opened}
          onClose={() => {
            setSelected(undefined);
            close();
          }}
        />
      </Portal>
    </Stack>
  );
}
