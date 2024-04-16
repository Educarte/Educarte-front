import { createColumnHelper } from '@tanstack/react-table';
import { Box, Group, Loader, Stack, Switch } from '@mantine/core';
import { Table } from '@/components/__commons';
import { useState } from 'react';
import { useToggleStudents } from '@/core/domain/students/students.hooks';
import { Students } from '@/core/domain/classroom/classroom.types';

interface Props {
  data?: Students[];
  loading?: boolean;
}

export function SimpleList({ data, loading }: Props) {
  const [users] = useState<Students>();
  const toggleActive = useToggleStudents();
  const columnHelper = createColumnHelper<Students>();

  function ageCalculator(birthday: Date) {
    const today = new Date();
    const birthDate = new Date(birthday);

    let age = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  const columns = [
    columnHelper.accessor('name', {
      id: 'date',
      header: 'Nome',
    }),

    columnHelper.accessor('birthDate', {
      id: 'birthDate',
      header: 'Idade',
      cell: ({ getValue }) => (
        <Stack w={80}> {ageCalculator(getValue())} </Stack>
      ),
    }),
    columnHelper.accessor('contractedHours.hours', {
      id: 'hours',
      header: 'Carga Horária Contrada',
      cell: ({ row }) => (
        <Stack w={40}>{row.original.contractedHours[0].hours} H</Stack>
      ),
    }),
    columnHelper.accessor('legalGuardians', {
      id: 'legalGuardian',
      header: '1º Representante Legal',
      cell: ({ row }) => {
        return row.original.legalGuardians
          ? row.original.legalGuardians[0]?.name
          : 'Não informado';
      },
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Status da Matricula',
      cell: ({ row }) => (
        <Group w={10} gap="sm">
          {toggleActive.isLoading && row.original.id === users?.id ? (
            <Box style={{ width: '1.5rem', display: 'flex' }}>
              {toggleActive.isLoading && <Loader size="sm" />}
            </Box>
          ) : (
            <Switch
              checked={row.original.status === 0 ? true : false}
              label={row.original.status === 1 ? 'Inativo' : 'Ativo'}
              color="green"
              size="xs"
              disabled={toggleActive.isLoading}
            />
          )}
        </Group>
      ),
    }),
  ];

  return (
    <Table<Students> columns={columns} data={data || []} loading={loading} />
  );
}
