import { ListMenusQuery } from '@/core/domain/menu/menu.types';
import { Button, Group, Input, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { RiArrowDropDownLine, RiSearchLine } from 'react-icons/ri';

interface Props {
  onChange: (values: ListMenusQuery) => void;
}

const initialValues: ListMenusQuery = {
  page: 1,
  pageSize: 30,
  search: '',
};

const iconStyle = {
  color: 'var(--mantine-color-primary-9)',
  fontSize: 15,
};

export function MenusFilters({ onChange }: Props) {
  const form = useForm<ListMenusQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: ListMenusQuery) {
    form.setValues({ ...values });
    onChange({ ...values });
  }

  function handleReset() {
    form.reset();
    form.setValues({ status: null });
    onChange(initialValues);
  }

  return (
    <form onReset={handleReset}>
      <Group justify="flex-end" gap="sm">
        <Select
          {...form.getInputProps('status')}
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
              status: e === 'true' ? 0 : 1,
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
