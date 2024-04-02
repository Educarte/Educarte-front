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

export function UsersFilters({ onChange }: Props) {
  const form = useForm<ListUsersQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: ListUsersQuery) {
    form.setValues({ ...values });
    onChange({ ...values });
  }

  function handleReset() {
    form.reset();
    form.setValues({ isActive: null });
    onChange(initialValues);
  }

  return (
    <form onReset={handleReset}>
      <Group justify="flex-end" gap="sm">
        <Select
          {...form.getInputProps('profile')}
          clearable
          placeholder="Tipo"
          rightSection={<RiArrowDropDownLine style={iconStyle} />}
          data={[
            {
              label: 'Administrador',
              value: '0',
            },
            {
              label: 'Guardião Legal',
              value: '1',
            },
            {
              label: 'Colaborador',
              value: '2',
            },
            {
              label: 'Professor',
              value: '3',
            },
          ]}
          onChange={(e) => {
            handleChange({ ...form.values, profile: Number(e) });
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
              label: 'Inativo',
              value: 'false',
            },
          ]}
          onChange={(e) => {
            handleChange({
              ...form.values,
              isActive: e === 'true' ? true : false,
            });
          }}
        />

        <Input
          {...form.getInputProps('search')}
          placeholder="Pesquise por nome ou e-mail"
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
