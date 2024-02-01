import { useState } from 'react';
import { Stack } from '@mantine/core';
import { PageContainer } from '@/components/__commons';
import { useDebouncedValue } from '@mantine/hooks';
import { EmployeesList } from '@/components/Employees/List';
import { ListUsersQuery, useUsers } from '@/core/domain/users';
import { MessagesFilters } from '@/components/Messages/Filters';

export default function MessagesPage() {
  const [params, setParams] = useState<ListUsersQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data, isLoading } = useUsers(debounced);

  return (
    <Stack gap="md">
      <MessagesFilters onChange={setParams} />
      <PageContainer
        title="Recados"
        description="Gerencie todos os recados da plataforma"
      >
        <EmployeesList data={data} loading={isLoading} />
      </PageContainer>
    </Stack>
  );
}
