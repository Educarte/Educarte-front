import { createColumnHelper } from '@tanstack/react-table';
import { Table } from '@/components/__commons';

import {
  ActionIcon,
  Box,
  Group,
  Loader,
  Portal,
  Stack,
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
import { useDisclosure } from '@mantine/hooks';
import { showConfirm } from '@/core/utils';
import {
  ListMessagesResponse,
  Messages,
} from '@/core/domain/messages/messages.types';
import dayjs from 'dayjs';
import {
  useRemoveMessages,
  useToggleMessages,
} from '@/core/domain/messages/messages.hooks';
import { MessagesModal } from '../Modal';

interface Props {
  data?: ListMessagesResponse;
  loading?: boolean;
  onPaginate?: (page: number) => void;
}

export function MessagesList({ data, loading, onPaginate }: Props) {
  const [selected, setSelected] = useState<Messages>();
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const columnHelper = createColumnHelper<Messages>();
  const [users, setUsers] = useState<Messages>();
  const toggleActive = useToggleMessages();
  const removeMessagesMutation = useRemoveMessages();

  const iconStyle = {
    color: theme.colors.primary[9],
    width: '10%',
    height: '10%',
  };

  function showConfirmRemoveUser(messages: Messages) {
    return showConfirm({
      title: 'Remover Recado',
      message: 'Deseja realmente remover esse recado?',
      icon: <RiDeleteBin7Line style={iconStyle} />,
      confirmText: 'Remover Recado',
      onConfirm: async () =>
        await removeMessagesMutation.mutateAsync(messages.id),
    });
  }

  function confirmToggle(item: Messages) {
    const isActive = item.status === 0;
    modals.openConfirmModal({
      title: `${isActive ? 'Inativar' : 'Ativar'} Recado`,
      children: (
        <>
          <Group justify="center" gap={'xs'} style={{ textAlign: 'center' }}>
            {item.status === 1 ? (
              <RiLockUnlockLine style={{ color: '#6d8eab' }} size={40} />
            ) : (
              <RiLockLine style={{ color: '#6d8eab' }} size={40} />
            )}
            <Text>Gostaria de proseguir com a inativação deste reacdo?</Text>
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
      header: 'Nome',
      cell: ({ getValue }) => <Stack w={150}>{getValue()}</Stack>,
    }),
    columnHelper.accessor('diaryType', {
      id: 'for',
      header: 'Para',
      cell: ({ getValue }) => {
        if (getValue() === 0) {
          return 'Alunos';
        } else if (getValue() === 1) {
          return 'Turma';
        } else if (getValue() === 2) {
          return 'Escola';
        }
      },
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: 'Data de Publicação',
      cell: ({ getValue }) => {
        return <Stack w={100}> {dayjs(getValue()).format('DD/MM/YYYY')}</Stack>;
      },
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Group gap="0.1rem">
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
      <Table<Messages>
        columns={columns}
        data={data?.items || []}
        loading={loading}
        pagination={{
          total: data?.pagination.pageCount || 1,
          onPaginate: (page) => onPaginate && onPaginate(page),
        }}
      />
      <Portal>
        <MessagesModal
          messages={selected}
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
