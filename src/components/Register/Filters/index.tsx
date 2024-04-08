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

export function RegistersFilters({ onChange }: Props) {
  const form = useForm<ListStudentsQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: ListStudentsQuery) {
    form.setValues({ ...values });
    onChange({
      ...values,
      classroomType: values?.classroomType
        ? Number(values.classroomType)
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
          {...form.getInputProps('classroomType')}
          clearable
          placeholder="Sala"
          rightSection={<RiArrowDropDownLine style={iconStyle} />}
          data={[
            {
              label: 'Berçário 1',
              value: '0',
            },
            {
              label: 'Berçário 2',
              value: '1',
            },
            {
              label: 'Maternal 1',
              value: '2',
            },
            {
              label: 'Maternal 2',
              value: '3',
            },
            {
              label: 'Pré 1',
              value: '4',
            },
            {
              label: 'Pré 2',
              value: '5',
            },
            {
              label: 'Recreação',
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
          placeholder="Status"
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
            handleChange({
              ...form.values,
              studentStatus: e,
            });
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
