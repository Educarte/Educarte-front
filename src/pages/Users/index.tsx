import { RiAddLine } from 'react-icons/ri';
import { Button, Portal, Stack } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';

import { PageContainer } from '@/components/__commons';
import { UserFilters, UserModal, UsersList } from '@/components/Users';
import { useState } from 'react';
import { User, ListUsersQuery, useUsers } from '@/core/domain/users';

export default function UsersPage() {
  const [selected, setSelected] = useState<User>();
  const [opened, { open, close }] = useDisclosure(false);
  const [params, setParams] = useState<ListUsersQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data: users, isLoading: loadingUsers } = useUsers(debounced);

  return (
    <Stack gap="md">
      <UserFilters onChange={setParams} />
      <PageContainer
        title="Usuários"
        description="Gerencie os usuários ou adicione novos"
        rightSection={
          <Button variant="filled" onClick={open}>
            <RiAddLine />
            Novo Usuário
          </Button>
        }
      >
        <UsersList
          data={users}
          loading={loadingUsers}
          onPaginate={(page) => setParams((params) => ({ ...params, page }))}
          onSelectUser={(user) => {
            setSelected(user);
            open();
          }}
        />
      </PageContainer>
      <Portal>
        <UserModal
          user={selected}
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
