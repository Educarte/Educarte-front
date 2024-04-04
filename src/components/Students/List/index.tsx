import { createColumnHelper } from '@tanstack/react-table';
import { Table } from '@/components/__commons';

import {
  ActionIcon,
  Box,
  Group,
  Loader,
  Switch,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  RiDeleteBin7Line,
  RiEyeLine,
  RiLockLine,
  RiLockUnlockLine,
} from 'react-icons/ri';
import { modals } from '@mantine/modals';
import { useState } from 'react';
import {
  ListStudentsResponse,
  Students,
} from '@/core/domain/students/students.types';
import { showConfirm } from '@/core/utils';
import {
  useRemoveStudents,
  useToggleStudents,
} from '@/core/domain/students/students.hooks';
import { useNavigate } from 'react-router-dom';

interface Props {
  data?: ListStudentsResponse;
  loading?: boolean;
  onPaginate?: (page: number) => void;
}

export function StudentsList({ data, loading, onPaginate }: Props) {
  const columnHelper = createColumnHelper<Students>();
  const theme = useMantineTheme();
  const [users, setUsers] = useState<Students>();
  const toggleActive = useToggleStudents();
  const removeStudentsMutation = useRemoveStudents();
  const navigate = useNavigate();

  const iconStyle = {
    color: theme.colors.primary[9],
    width: '10%',
    height: '10%',
  };

  function showConfirmRemoveStudent(students: Students) {
    return showConfirm({
      title: 'Remover Estudante',
      message: 'Deseja realmente remover esse estudante?',
      icon: <RiDeleteBin7Line style={iconStyle} />,
      confirmText: 'Remover Estudante',
      onConfirm: async () =>
        await removeStudentsMutation.mutateAsync(students.id),
    });
  }

  function confirmToggle(item: Students) {
    const isActive = item.status === 0;
    modals.openConfirmModal({
      title: `${isActive ? 'Inativar' : 'Ativar'} Usuário`,
      children: (
        <>
          <Group justify="center" gap={'xs'} style={{ textAlign: 'center' }}>
            {item.status === 1 ? (
              <RiLockUnlockLine style={{ color: '#30592e' }} size={40} />
            ) : (
              <RiLockLine style={{ color: '#30592e' }} size={40} />
            )}
            <Text>Gostaria de proseguir com a inativação deste usuário?</Text>
          </Group>
        </>
      ),
      centered: true,
      confirmProps: {
        onClick: () => toggleActive.mutateAsync(item.id),
        children: `${isActive ? 'Inativar' : 'Ativar'}`,
        color: 'primary',
      },
      cancelProps: {
        children: 'Cancelar',
        variant: 'outline',
        color: 'primary.9',
      },
    });
  }

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Ativo',
    }),
    columnHelper.accessor('time', {
      id: 'time',
      header: 'Turno',
      cell: ({ getValue }) => {
        if (getValue() === 0) {
          return 'Matutino';
        } else if (getValue() === 1) {
          return 'Vespertino';
        } else if (getValue() === 2) {
          return 'Integral';
        }
        return getValue();
      },
    }),
    columnHelper.accessor('classroom.name', {
      id: 'classroom',
      header: 'Turma',
    }),
    columnHelper.accessor('contractedHours', {
      id: 'contractedHours',
      header: 'Carga Horária Contratada',
      cell: ({ row }) => {
        return row.original.contractedHours.map((contract) => {
          return `${contract.hours} H`;
        });
      },
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Group gap="sm">
          {toggleActive.isLoading && row.original.id === users?.id ? (
            <Box style={{ width: '1.5rem', display: 'flex' }}>
              {toggleActive.isLoading && <Loader size="sm" />}
            </Box>
          ) : (
            <Switch
              checked={row.original.status === 0 ? true : false}
              onChange={() => {
                setUsers(row.original);
                confirmToggle(row.original);
              }}
              label={row.original.status === 1 ? 'Inativo' : 'Ativo'}
              color="green"
              size="xs"
              disabled={toggleActive.isLoading}
            />
          )}
        </Group>
      ),
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions',
      header: '',
      cell: ({ getValue }) => (
        <Group justify="flex-end" gap="0.03rem" align="center">
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => navigate(`/app/student/${getValue().id}`)}
          >
            <RiEyeLine style={{ width: '60%', height: '60%' }} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => showConfirmRemoveStudent(getValue())}
          >
            <RiDeleteBin7Line style={{ width: '60%', height: '60%' }} />
          </ActionIcon>
        </Group>
      ),
    }),
  ];

  return (
    <Table<Students>
      columns={columns}
      data={data?.items || []}
      loading={loading}
      pagination={{
        total: data?.pagination.pageCount || 1,
        onPaginate: (page) => onPaginate && onPaginate(page),
      }}
    />
  );
}
