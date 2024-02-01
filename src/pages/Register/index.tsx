import { useState } from 'react';
import { Stack } from '@mantine/core';
import { PageContainer } from '@/components/__commons';
import { useDebouncedValue } from '@mantine/hooks';
import { EmployeesList } from '@/components/Employees/List';
import { ListUsersQuery, useUsers } from '@/core/domain/users';
import { RegistersFilters } from '@/components/Register/Filters';

export default function RegisterPage() {
  const [params, setParams] = useState<ListUsersQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data, isLoading } = useUsers(debounced);

  return (
    <Stack gap="md">
      <RegistersFilters onChange={setParams} />
      <PageContainer
        title="Controle de Entradas e Saída"
        description="Gerencie todas as entradas e saídas dos alunos"
      >
        <EmployeesList data={data} loading={isLoading} />
      </PageContainer>
    </Stack>
  );
}
