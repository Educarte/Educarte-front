import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Group, useMantineTheme } from '@mantine/core';
import { RiDeleteBin7Line, RiEditBoxLine, RiLockLine } from 'react-icons/ri';
import { ActiveBadge, Table } from '@/components/__commons';
import {
  ListUsersResponse,
  User,
  useRemoveUser,
  useToggleUser,
} from '@/core/domain/users';
import { showConfirm } from '@/core/utils';

interface Props {
  data?: ListUsersResponse;
  loading?: boolean;
  onSelectUser: (user: User) => void;
  onPaginate?: (page: number) => void;
}

export function UsersList({ data, loading, onSelectUser, onPaginate }: Props) {
  const theme = useMantineTheme();
  const columnHelper = createColumnHelper<User>();
  const iconStyle = {
    color: theme.colors.primary[9],
    width: '10%',
    height: '10%',
  };
  const toggleUserMutation = useToggleUser();
  const removeUserMutation = useRemoveUser();

  function showConfirmToggleUser(user: User) {
    return showConfirm({
      title: `Status do Usuário`,
      message: `Deseja alterar o status desse usuário?`,
      icon: <RiLockLine style={iconStyle} />,
      confirmText: `Alterar Status`,
      onConfirm: async () => await toggleUserMutation.mutateAsync(user.id),
    });
  }

  function showConfirmRemoveUser(user: User) {
    return showConfirm({
      title: 'Remover Usuário',
      message: 'Deseja realmente remover esse usuário?',
      icon: <RiDeleteBin7Line style={iconStyle} />,
      confirmText: 'Remover Usuário',
      onConfirm: async () => await removeUserMutation.mutateAsync(user.id),
    });
  }

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Nome',
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: 'E-mail',
    }),
    columnHelper.accessor('cellphone', {
      id: 'cellphone',
      header: 'Telefone',
    }),
    columnHelper.accessor('role.name', {
      id: 'role',
      header: 'Tipo',
    }),
    columnHelper.accessor((row) => row.status, {
      id: 'active',
      header: 'Situação',
      cell: ({ getValue }) => <ActiveBadge active={getValue() === 0} />,
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions',
      header: '',
      cell: ({ getValue }) => (
        <Group justify="flex-end" gap="xs" align="center">
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => showConfirmToggleUser(getValue())}
          >
            <RiLockLine style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => onSelectUser(getValue())}
          >
            <RiEditBoxLine style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => showConfirmRemoveUser(getValue())}
          >
            <RiDeleteBin7Line style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
        </Group>
      ),
    }),
  ];

  return (
    <Table<User>
      columns={columns}
      data={data?.items || []}
      loading={loading || toggleUserMutation.isLoading}
      pagination={{
        total: data?.pagination.pageCount || 1,
        onPaginate: (page) => onPaginate && onPaginate(page),
      }}
    />
  );
}
