import { useState } from 'react';
import { Stack } from '@mantine/core';
import { PageContainer } from '@/components/__commons';
import { useDebouncedValue } from '@mantine/hooks';
import { EmployeesList } from '@/components/Employees/List';
import { ListUsersQuery, useUsers } from '@/core/domain/users';
import { ClassesFilters } from '@/components/Classes/Filters';

export default function ClassesPage() {
  const [params, setParams] = useState<ListUsersQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data, isLoading } = useUsers(debounced);

  return (
    <Stack gap="md">
      <ClassesFilters onChange={setParams} />
      <PageContainer
        title="Turmas"
        description="Gerencie todas as turmas da plataforma"
      >
        <EmployeesList data={data} loading={isLoading} />
      </PageContainer>
    </Stack>
  );
}
