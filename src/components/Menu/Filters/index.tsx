import { ListUsersQuery } from '@/core/domain/users';
import { Button, Group, Input, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { RiArrowDropDownLine, RiSearchLine } from 'react-icons/ri';

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

export function MenusFilters({ onChange }: Props) {
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
        <Select
          {...form.getInputProps('isActive')}
          clearable
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
