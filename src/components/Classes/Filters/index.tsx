import { ListClassroomQuery } from '@/core/domain/classroom';
import { Button, Group, Input, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { RiArrowDropDownLine, RiSearchLine } from 'react-icons/ri';

interface Props {
  onChange: (values: ListClassroomQuery) => void;
}

const initialValues: ListClassroomQuery = {
  page: 1,
  pageSize: 30,
  search: '',
  status: null,
  classroomType: null,
};

const iconStyle = {
  color: 'var(--mantine-color-primary-9)',
  fontSize: 15,
};

export function ClassesFilters({ onChange }: Props) {
  const form = useForm<ListClassroomQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: ListClassroomQuery) {
    console.log('values', values);

    form.setValues({ ...values });
    onChange({
      ...values,
      status: values?.status ?? null,
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
          {...form.getInputProps('classroomType')}
          clearable
          placeholder="Faixa etária"
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
          {...form.getInputProps('status')}
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
            handleChange({ ...form.values, status: e });
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
