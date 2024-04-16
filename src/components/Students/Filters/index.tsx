import { ListStudentsQuery } from '@/core/domain/students/students.types';
import { Button, Group, Input, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { RiArrowDropDownLine, RiSearchLine } from 'react-icons/ri';
import ClassroomSelect from '../ClassroomSelect';

interface Props {
  onChange: (values: ListStudentsQuery) => void;
}

const initialValues: ListStudentsQuery = {
  page: 1,
  pageSize: 30,
  search: '',
  time: null,
  studentStatus: null,
  classroomId: null,
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
      classroomId: values?.classroomId ?? null,
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
        <ClassroomSelect
          {...form.getInputProps('classroomId')}
          clearable
          rightSection={<RiArrowDropDownLine style={iconStyle} />}
          onChange={(e) => {
            handleChange({ ...form.values, classroomId: e });
          }}
          width={'18%'}
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
