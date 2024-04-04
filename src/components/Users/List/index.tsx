import { createColumnHelper } from '@tanstack/react-table';
import { Table } from '@/components/__commons';

import {
  ActionIcon,
  Box,
  Group,
  Loader,
  Portal,
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
  ListUsersResponse,
  Users,
  useRemoveUser,
  useToggleUsers,
} from '@/core/domain/users';
import { UsersModal } from '../Modal';
import { useDisclosure } from '@mantine/hooks';
import { maskPhone, showConfirm } from '@/core/utils';

interface Props {
  data?: ListUsersResponse;
  loading?: boolean;
  onPaginate?: (page: number) => void;
}

export function UsersList({ data, loading, onPaginate }: Props) {
  const [selected, setSelected] = useState<Users>();
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const columnHelper = createColumnHelper<Users>();
  const [users, setUsers] = useState<Users>();
  const toggleActive = useToggleUsers();
  const removeUserMutation = useRemoveUser();
  const iconStyle = {
    color: theme.colors.primary[9],
    width: '10%',
    height: '10%',
  };

  function showConfirmRemoveUser(user: Users) {
    return showConfirm({
      title: 'Remover Usuário',
      message: 'Deseja realmente remover esse usuário?',
      icon: <RiDeleteBin7Line style={iconStyle} />,
      confirmText: 'Remover Usuário',
      onConfirm: async () => await removeUserMutation.mutateAsync(user.id),
    });
  }

  function confirmToggle(item: Users) {
    const isActive = item.status === 0;
    modals.openConfirmModal({
      title: `${isActive ? 'Inativar' : 'Ativar'} Usuário`,
      children: (
        <>
          <Group justify="center" gap={'xs'} style={{ textAlign: 'center' }}>
            {item.status === 1 ? (
              <RiLockUnlockLine style={{ color: '#6d8eab' }} size={40} />
            ) : (
              <RiLockLine style={{ color: '#6d8eab' }} size={40} />
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
    columnHelper.accessor('cellphone', {
      id: 'cellphone',
      header: 'Telefone',
      cell: ({ getValue }) => {
        return maskPhone(getValue());
      },
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: 'E-mail',
    }),
    columnHelper.accessor('profile', {
      id: 'profile',
      header: 'Tipo',
      cell: ({ getValue }) => {
        // Verifica se o valor do perfil é igual a 3
        if (getValue() === 0) {
          return 'Administrador';
        } else if (getValue() === 1) {
          return 'Guardião Legal';
        } else if (getValue() === 2) {
          return 'Colaborador';
        } else if (getValue() == 3) {
          return 'Professor';
        }
        // Se não for 3, retorna o valor padrão
        return getValue();
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
            onClick={() => {
              setSelected(getValue());
              open();
            }}
          >
            <RiEyeLine style={{ width: '60%', height: '60%' }} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => showConfirmRemoveUser(getValue())}
          >
            <RiDeleteBin7Line style={{ width: '60%', height: '60%' }} />
          </ActionIcon>
        </Group>
      ),
    }),
  ];

  return (
    <>
      <Table<Users>
        columns={columns}
        data={data?.items || []}
        loading={loading}
        pagination={{
          total: data?.pagination.pageCount || 1,
          onPaginate: (page) => onPaginate && onPaginate(page),
        }}
      />

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
    </>
  );
}
