import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Group, Stack, useMantineTheme } from '@mantine/core';
import { RiDeleteBin7Line, RiEyeLine } from 'react-icons/ri';
import { Table } from '@/components/__commons';
import { Link } from 'react-router-dom';
import { Students } from '@/core/domain/classroom/classroom.types';
import { showConfirm } from '@/core/utils';
import { useEffect } from 'react';

interface Props {
  data?: Students[];
  loading?: boolean;
  students?: Students[];
  setStudents: React.Dispatch<React.SetStateAction<Students[] | undefined>>;
}

export function SimpleStudentList({
  data,
  loading,
  students,
  setStudents,
}: Props) {
  const columnHelper = createColumnHelper<Students>();
  const theme = useMantineTheme();
  const iconStyle = {
    color: theme.colors.primary[9],
    width: '10%',
    height: '10%',
  };

  useEffect(() => {
    setStudents(data);
  }, [data]);

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

  function removeStudent(id: string) {
    setStudents((prevItems) => prevItems?.filter((item) => item.id !== id));
  }

  function showConfirmRemoveStudent(student: Students) {
    return showConfirm({
      title: 'Remover Aluno',
      message: 'Deseja realmente remover esse aluno dessa turma?',
      icon: <RiDeleteBin7Line style={iconStyle} />,
      confirmText: 'Remover ',
      onConfirm: async () => removeStudent(student.id),
    });
  }

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Nome',
    }),

    columnHelper.accessor('birthDate', {
      id: 'birthDate',
      header: 'Idade',
      cell: ({ getValue }) => <Stack w={48}>{ageCalculator(getValue())}</Stack>,
    }),
    columnHelper.accessor('contractedHours.hours', {
      id: 'hours',
      header: 'Horas Contratadas',
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions',
      header: '',
      cell: ({ getValue }) => (
        <Group justify="flex-end" gap="0.1rem" align="center">
          <ActionIcon
            variant="transparent"
            size="lg"
            component={Link}
            to={`/app/student/${getValue().id}`}
          >
            <RiEyeLine style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => showConfirmRemoveStudent(getValue())}
          >
            <RiDeleteBin7Line style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
        </Group>
      ),
    }),
  ];

  return (
    <Table<Students>
      columns={columns}
      data={students || []}
      loading={loading}
    />
  );
}
