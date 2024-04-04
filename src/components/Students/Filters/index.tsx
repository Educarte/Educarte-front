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
  time: null,
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
    onChange({
      ...values,
      studentStatus: values?.studentStatus ?? null,
      time: values?.time ?? null,
      classroomType: values?.classroomType ?? null,
    });
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
          {...form.getInputProps('time')}
          clearable
          placeholder="Turno"
          rightSection={<RiArrowDropDownLine style={iconStyle} />}
          data={[
            {
              label: 'Matutino',
              value: '0',
            },
            {
              label: 'Vespertino',
              value: '1',
            },
            {
              label: 'Integral',
              value: '2',
            },
          ]}
          onChange={(e) => {
            handleChange({ ...form.values, time: e });
          }}
        />
        <Select
          {...form.getInputProps('classroomType')}
          clearable
          placeholder="Tipo de turma"
          rightSection={<RiArrowDropDownLine style={iconStyle} />}
          data={[
            {
              label: '0 meses até 11 meses',
              value: '0',
            },
            {
              label: '12 meses até 1 ano e 11 meses',
              value: '1',
            },
            {
              label: 'até 24 meses completos',
              value: '2',
            },
            {
              label: 'até 36 meses completos',
              value: '3',
            },
            {
              label: 'até 4 anos completos',
              value: '4',
            },
            {
              label: 'até 5 anos completos',
              value: '5',
            },
            {
              label: 'de 4 meses até 6 anos',
              value: '6',
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
