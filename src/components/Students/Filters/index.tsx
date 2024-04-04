import { ListStudentsQuery } from '@/core/domain/students/students.types';
import { Button, Group, Input, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { RiArrowDropDownLine, RiSearchLine } from 'react-icons/ri';

interface Props {
  onChange: (values: ListStudentsQuery) => void;
}

const initialValues: ListStudentsQuery = {
  page: 1,
  pageSize: 30,
  search: '',
  studentStatus: null,
  classroomType: null,
};

const iconStyle = {
  color: 'var(--mantine-color-primary-9)',
  fontSize: 15,
};

export function StudentsFilters({ onChange }: Props) {
  const form = useForm<ListStudentsQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: ListStudentsQuery) {
    form.setValues({ ...values });
    onChange({ ...values, studentStatus: values?.studentStatus ?? null });
  }

  function handleReset() {
    form.reset();
    form.setValues(initialValues);
    onChange(initialValues);
  }

  return (
    <form onReset={handleReset}>
      <Group justify="flex-end" gap="sm">
        <Select
          {...form.getInputProps('')}
          clearable
          placeholder="Turno"
          rightSection={<RiArrowDropDownLine style={iconStyle} />}
          data={[
            {
              label: 'Administrador',
              value: '0e6cf42b-f9d2-4bec-bb5d-7410be8bb6ee',
            },
            {
              label: 'Entregador',
              value: 'cedc36a8-b1c3-42fa-9bc6-e2e9585b7601',
            },
          ]}
          onChange={() => {
            handleChange({ ...form.values });
          }}
        />
        <Select
          {...form.getInputProps('classroomType')}
          clearable
          placeholder="Turma"
          rightSection={<RiArrowDropDownLine style={iconStyle} />}
          data={[
            {
              label: 'Administrador',
              value: '0e6cf42b-f9d2-4bec-bb5d-7410be8bb6ee',
            },
            {
              label: 'Entregador',
              value: 'cedc36a8-b1c3-42fa-9bc6-e2e9585b7601',
            },
          ]}
          onChange={(e) => {
            handleChange({ ...form.values, classroomType: e });
          }}
        />

        <Select
          {...form.getInputProps('studentStatus')}
          clearable
          placeholder="Situação"
          rightSection={<RiArrowDropDownLine style={iconStyle} />}
          data={[
            {
              label: 'Ativo',
              value: '0',
            },
            {
              label: 'Inativo',
              value: '1',
            },
          ]}
          onChange={(e) => {
            handleChange({ ...form.values, studentStatus: e });
          }}
        />

        <Input
          {...form.getInputProps('search')}
          placeholder="Pesquise por nome"
          rightSection={<RiSearchLine style={iconStyle} />}
          onChange={(e) =>
            handleChange({ ...form.values, search: e.target.value })
          }
          w={240}
        />

        <Button size="sm" variant="outline" type="reset" onClick={handleReset}>
          Limpar filtros
        </Button>
      </Group>
    </form>
  );
}
