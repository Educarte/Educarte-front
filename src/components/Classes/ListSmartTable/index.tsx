import {
  ActionIcon,
  Box,
  Group,
  Loader,
  Switch,
  useMantineTheme,
} from '@mantine/core';
import { RiDeleteBin7Line, RiEditBoxLine, RiLockLine } from 'react-icons/ri';
import { FaChevronRight } from 'react-icons/fa';
import clsx from 'clsx';

import { useRemoveUser } from '@/core/domain/users';
import { showConfirm } from '@/core/utils';
import classes from './../../__commons/SmartTable/SmartTable.module.css';
import { useState } from 'react';
import { DataTableColumn } from 'mantine-datatable';
import { SmartTable } from '@/components/__commons/SmartTable';
import {
  Classroom,
  ListClassroomResponse,
} from '@/core/domain/classroom/classroom.types';
import { useToggleClassroom } from '@/core/domain/classroom/classroom.hooks';
import { SimpleList } from '../SimpleList';
import { useNavigate } from 'react-router-dom';

interface Props {
  data?: ListClassroomResponse;
  loading?: boolean;
  onSelectClassroom: (classroom: Classroom) => void;
  onPaginate?: (page: number) => void;
}

export function ClassroomSmartTableList({ data, loading, onPaginate }: Props) {
  const [expandedUserIds, setExpandedUserIds] = useState<string[]>([]);
  const [classroomId, setClassroomId] = useState<string>();
  const toggleMutation = useToggleClassroom();
  const removeUserMutation = useRemoveUser();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const iconStyle = {
    color: theme.colors.primary[9],
    width: '10%',
    height: '10%',
  };

  function showConfirmToggleClassroom(classroomId: string) {
    return showConfirm({
      title: `Status da Turma`,
      message: `Deseja alterar o status dessa Turma?`,
      icon: <RiLockLine style={iconStyle} />,
      confirmText: `Alterar Status`,
      onConfirm: async () => await toggleMutation.mutateAsync(classroomId),
    });
  }

  function showConfirmRemoveUser(classroom: Classroom) {
    return showConfirm({
      title: 'Remover Usuário',
      message: 'Deseja realmente remover esse usuário?',
      icon: <RiDeleteBin7Line style={iconStyle} />,
      confirmText: 'Remover Usuário',
      onConfirm: async () => await removeUserMutation.mutateAsync(classroom.id),
    });
  }

  const columns: DataTableColumn<Classroom>[] = [
    {
      accessor: '',
      render: ({ id }) => (
        <FaChevronRight
          className={clsx(classes.icon, classes.expandIcon, {
            [classes.expandIconRotated]: expandedUserIds.includes(String(id)),
          })}
        />
      ),
    },
    {
      accessor: 'name',
      title: 'Nome',
    },
    {
      accessor: 'classroomType',
      title: 'Faixa etária',
      render: ({ classroomType }) => {
        if (classroomType === 0) {
          return '0 meses até 11 meses';
        } else if (classroomType === 1) {
          return '12 meses até 1 ano e 11 meses';
        } else if (classroomType === 2) {
          return 'até 24 meses completos';
        } else if (classroomType === 3) {
          return 'até 36 meses completos';
        } else if (classroomType === 4) {
          return 'até 4 anos completos';
        } else if (classroomType === 5) {
          return 'até 5 anos completos';
        } else if (classroomType === 6) {
          return 'de 4 meses até 6 anos';
        }
      },
    },
    {
      accessor: 'maxStudents',
      title: 'Quantidade de Alunos',
      render: ({ maxStudents, currentQuantityStudents }) => {
        return `${currentQuantityStudents} / ${maxStudents}`;
      },
    },
    { accessor: 'teacher.name', title: 'Professor (a)' },
    {
      accessor: 'active',
      title: 'Situação',
      render: ({ status, id }) => (
        <Group gap="sm">
          {toggleMutation.isLoading && id === classroomId ? (
            <Box style={{ width: '1.5rem', display: 'flex' }}>
              {toggleMutation.isLoading && <Loader size="sm" />}
            </Box>
          ) : (
            <Switch
              checked={status === 0 ? true : false}
              onChange={() => {
                setClassroomId(id);
                showConfirmToggleClassroom(String(id));
              }}
              label={status === 1 ? 'Inativo' : 'Ativo'}
              color="green"
              size="xs"
              disabled={toggleMutation.isLoading}
            />
          )}
        </Group>
      ),
    },
    {
      accessor: '',
      render: (user) => (
        <Group gap={4} justify="right" wrap="nowrap">
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => navigate(`/app/classes/${user.id}`)}
          >
            <RiEditBoxLine style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => showConfirmRemoveUser(user)}
          >
            <RiDeleteBin7Line style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  return (
    <SmartTable<Classroom>
      records={data?.items || []}
      columns={columns || []}
      fetching={loading}
      rowExpansion={{
        allowMultiple: true,
        collapseProps: {
          transitionDuration: 150,
          animateOpacity: false,
          transitionTimingFunction: 'ease-out',
        },

        expanded: {
          recordIds: expandedUserIds,
          onRecordIdsChange: setExpandedUserIds,
        },

        content: ({ record }) => <SimpleList data={record.students} />,
      }}
      pagination={{
        total: data?.pagination.pageCount || 1,
        onPaginate: (page) => onPaginate && onPaginate(page),
      }}
    />
  );
}
