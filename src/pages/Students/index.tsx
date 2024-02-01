import { useState } from 'react';
import { Stack } from '@mantine/core';
import { PageContainer } from '@/components/__commons';
import { useDebouncedValue } from '@mantine/hooks';
import { EmployeesList } from '@/components/Employees/List';
import { ListUsersQuery, useUsers } from '@/core/domain/users';
import { StudentsFilters } from '@/components/Students/Filters';

export default function StudentsPage() {
  const [params, setParams] = useState<ListUsersQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data, isLoading } = useUsers(debounced);

  return (
    <Stack gap="md">
      <StudentsFilters onChange={setParams} />
      <PageContainer
        title="Alunos"
        description="Gerencie todas os alunos da plataforma"
      >
        <EmployeesList data={data} loading={isLoading} />
      </PageContainer>
    </Stack>
  );
}
