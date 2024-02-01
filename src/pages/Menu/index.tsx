import { useState } from 'react';
import { Stack } from '@mantine/core';
import { PageContainer } from '@/components/__commons';
import { useDebouncedValue } from '@mantine/hooks';
import { EmployeesList } from '@/components/Employees/List';
import { ListUsersQuery, useUsers } from '@/core/domain/users';
import { MenusFilters } from '@/components/Menu/Filters';

export default function MenuPage() {
  const [params, setParams] = useState<ListUsersQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data, isLoading } = useUsers(debounced);

  return (
    <Stack gap="md">
      <MenusFilters onChange={setParams} />
      <PageContainer
        title="Cardápio"
        description="Gerencie todos os cardápios da plataforma"
      >
        <EmployeesList data={data} loading={isLoading} />
      </PageContainer>
    </Stack>
  );
}
