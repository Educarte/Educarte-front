import { useState } from 'react';
import { Stack } from '@mantine/core';
import { PageContainer } from '@/components/__commons';
import { useDebouncedValue } from '@mantine/hooks';
import { RegistersFilters } from '@/components/Register/Filters';
import { RegisterList } from '@/components/Register/List';
import { useStudents } from '@/core/domain/students/students.hooks';
import { ListStudentsQuery } from '@/core/domain/students/students.types';

export default function RegisterPage() {
  const [params, setParams] = useState<ListStudentsQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data, isLoading } = useStudents(debounced);

  return (
    <Stack gap="md">
      <RegistersFilters onChange={setParams} />
      <PageContainer
        title="Controle de Entradas e Saída"
        description="Gerencie todas as entradas e saídas dos alunos"
      >
        <RegisterList
          data={data}
          loading={isLoading}
          onPaginate={(page) => setParams((params) => ({ ...params, page }))}
        />
      </PageContainer>
    </Stack>
  );
}
