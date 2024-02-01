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

const iconStyle = { color: 'var(--mantine-color-primary-9)', fontSize: 16 };

export function UserFilters({ onChange }: Props) {
  const form = useForm<ListUsersQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: ListUsersQuery) {
    form.setValues({ ...values });
    onChange({ ...values });
  }

  function handleReset() {
    form.reset();
    form.setValues({ roleId: null, isActive: null });
    onChange(initialValues);
  }

  return (
    <form onReset={handleReset}>
      <Group justify="flex-end" gap="sm">
        <Select
          {...form.getInputProps('roleId')}
          clearable
          placeholder="Tipo"
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
            handleChange({ ...form.values, roleId: String(e) });
          }}
        />
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
        />
        <Button variant="outline" type="reset" onClick={handleReset}>
          Limpar filtros
        </Button>
      </Group>
    </form>
  );
}
