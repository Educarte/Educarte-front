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
  studentHasNoClass: null,
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
      studentHasNoClass:
        values?.studentHasNoClass === 'true'
          ? true
          : values?.studentHasNoClass === 'false'
          ? false
          : null,
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
          size={'xs'}
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
          size={'xs'}
          clearable
          rightSection={<RiArrowDropDownLine style={iconStyle} />}
          onChange={(e) => {
            handleChange({ ...form.values, classroomId: e });
          }}
          width={'18%'}
        />

        <Select
          {...form.getInputProps('studentHasNoClass')}
          size={'xs'}
          clearable
          placeholder="Aluno sem turma"
          rightSection={<RiArrowDropDownLine style={iconStyle} />}
          data={[
            {
              label: 'Sim',
              value: 'true',
            },
            {
              label: 'Não',
              value: 'false',
            },
          ]}
          onChange={(e) => {
            handleChange({ ...form.values, studentHasNoClass: e });
          }}
        />

        <Select
          {...form.getInputProps('studentStatus')}
          size={'xs'}
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
          size={'xs'}
          placeholder="Pesquise por nome"
          rightSection={<RiSearchLine style={iconStyle} />}
          onChange={(e) =>
            handleChange({ ...form.values, search: e.target.value })
          }
          w={240}
        />

        <Button size="xs" variant="outline" type="reset" onClick={handleReset}>
          Limpar filtros
        </Button>
      </Group>
    </form>
  );
}
