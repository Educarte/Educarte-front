import { RiAddLine } from 'react-icons/ri';
import { Button, Center, Portal, Stack } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';

import { PageContainer } from '@/components/__commons';
import { useState } from 'react';
import { ListUsersQuery, Users, useUsers } from '@/core/domain/users';
import { UsersFilters } from '@/components/Users/Filters';
import { UsersList } from '@/components/Users/List';
import { UsersModal } from '@/components/Users/Modal';

export default function UsersPage() {
  const [selected, setSelected] = useState<Users>();
  const [opened, { open, close }] = useDisclosure(false);
  const [params, setParams] = useState<ListUsersQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data: users, isLoading: loadingUsers } = useUsers(debounced);

  return (
    <Stack gap="md">
      <UsersFilters onChange={setParams} />
      <PageContainer
        title="Usuários"
        description="Gerencie os usuários ou adicione novos"
        rightSection={
          <Button variant="filled" onClick={open}>
            <Center>
              <RiAddLine style={{ marginRight: '0.5em' }} />
              Novo Usuário
            </Center>
          </Button>
        }
      >
        <UsersList
          data={users}
          loading={loadingUsers}
          onPaginate={(page) => setParams((params) => ({ ...params, page }))}
        />
      </PageContainer>
      <Portal>
        <UsersModal
          users={selected}
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
