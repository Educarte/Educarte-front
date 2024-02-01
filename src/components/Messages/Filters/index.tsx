import { ListUsersQuery } from '@/core/domain/users';
import { Button, Group, Input, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {
  RiArrowDropDownLine,
  RiCalendarLine,
  RiSearchLine,
} from 'react-icons/ri';

interface Props {
  onChange: (values: ListUsersQuery) => void;
}

const initialValues: ListUsersQuery = {
  page: 1,
  pageSize: 30,
  search: '',
};

const iconStyle = {
  color: 'var(--mantine-color-primary-9)',
  fontSize: 15,
};

export function MessagesFilters({ onChange }: Props) {
  const form = useForm<ListUsersQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: ListUsersQuery) {
    form.setValues({ ...values });
    onChange({ ...values });
  }

  function handleReset() {
    form.reset();
    form.setValues({});
    onChange(initialValues);
  }

  return (
    <form onReset={handleReset}>
      <Group justify="flex-end" gap="sm">
        <DatePickerInput
          type="range"
          placeholder="00/00/0000 - 00/00/0000"
          rightSection={
            <RiCalendarLine size={'1.1rem'} style={{ color: '#547B9A' }} />
          }
          w={250}
          valueFormat="DD/MM/YYYY"
        />

        <Select
          {...form.getInputProps('isActive')}
          clearable
          w={180}
          placeholder="Situação"
          rightSection={<RiArrowDropDownLine style={iconStyle} />}
          data={[
            {
              label: 'Ativo',
              value: 'true',
            },
            {
              label: 'inativo',
              value: 'false',
            },
          ]}
          onChange={(e) => {
            handleChange({ ...form.values, isActive: e === 'true' });
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
