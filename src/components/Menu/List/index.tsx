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
import { showConfirm } from '@/core/utils';
import { ListMenusResponse, Menus } from '@/core/domain/menu/menu.types';
import dayjs from 'dayjs';
import { useRemoveMenus, useToggleMenus } from '@/core/domain/menu/menu.hooks';
import { MenuModal } from '../Modal';
import { useDisclosure } from '@mantine/hooks';

interface Props {
  data?: ListMenusResponse;
  loading?: boolean;
  onPaginate?: (page: number) => void;
}

export function MenuList({ data, loading, onPaginate }: Props) {
  const columnHelper = createColumnHelper<Menus>();
  const theme = useMantineTheme();
  const [menus, setMenus] = useState<Menus>();
  const toggleActive = useToggleMenus();
  const removeMenusMutation = useRemoveMenus();
  const [selected, setSelected] = useState<Menus>();
  const [opened, { open, close }] = useDisclosure(false);
  const iconStyle = {
    color: theme.colors.primary[9],
    width: '10%',
    height: '10%',
  };

  function showConfirmRemoveStudent(menus: Menus) {
    return showConfirm({
      title: 'Remover Cardápio',
      message: 'Deseja realmente remover esse cardápio?',
      icon: <RiDeleteBin7Line style={iconStyle} />,
      confirmText: 'Remover Cardápio',
      onConfirm: async () => await removeMenusMutation.mutateAsync(menus.id),
    });
  }

  function confirmToggle(item: Menus) {
    const isActive = item.status === 0;
    modals.openConfirmModal({
      title: `${isActive ? 'Inativar' : 'Ativar'} Cardápio`,
      children: (
        <>
          <Group justify="center" gap={'xs'} style={{ textAlign: 'center' }}>
            {item.status === 1 ? (
              <RiLockUnlockLine style={{ color: '#6d8eab' }} size={40} />
            ) : (
              <RiLockLine style={{ color: '#6d8eab' }} size={40} />
            )}
            <Text>Gostaria de proseguir com a inativação deste cardápio?</Text>
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
    }),
    columnHelper.accessor('startDate', {
      id: 'startDate',
      header: 'Início',
      cell: ({ getValue }) => {
        return dayjs(getValue()).format('DD/MM/YYYY');
      },
    }),
    columnHelper.accessor('validUntil', {
      id: 'validUntil',
      header: 'Termino',
      cell: ({ getValue }) => {
        return dayjs(getValue()).format('DD/MM/YYYY');
      },
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Group gap="sm">
          {toggleActive.isLoading && row.original.id === menus?.id ? (
            <Box style={{ width: '1.5rem', display: 'flex' }}>
              {toggleActive.isLoading && <Loader size="sm" />}
            </Box>
          ) : (
            <Switch
              checked={row.original.status === 0 ? true : false}
              onChange={() => {
                setMenus(row.original);
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
            onClick={() => showConfirmRemoveStudent(getValue())}
          >
            <RiDeleteBin7Line style={{ width: '60%', height: '60%' }} />
          </ActionIcon>
        </Group>
      ),
    }),
  ];

  return (
    <>
      <Table<Menus>
        columns={columns}
        data={data?.items || []}
        loading={loading}
        pagination={{
          total: data?.pagination.pageCount || 1,
          onPaginate: (page) => onPaginate && onPaginate(page),
        }}
      />
      <Portal>
        <MenuModal
          menus={selected}
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
