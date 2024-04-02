import { ListMessagesQuery } from '@/core/domain/messages/messages.types';
import { Button, Group, Input, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {
  RiArrowDropDownLine,
  RiCalendarLine,
  RiSearchLine,
} from 'react-icons/ri';

interface Props {
  onChange: (values: ListMessagesQuery) => void;
}

const initialValues: ListMessagesQuery = {
  page: 1,
  pageSize: 25,
  name: '',
  status: '',
};

const iconStyle = {
  color: 'var(--mantine-color-primary-9)',
  fontSize: 15,
};

export function MessagesFilters({ onChange }: Props) {
  const form = useForm<ListMessagesQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: ListMessagesQuery) {
    form.setValues({
      ...values,
      startDate: values?.dateRange ? values.dateRange[0] : undefined,
      endDate: values?.dateRange ? values.dateRange[1] : undefined,
    });
    onChange({ ...values });
  }

  function handleReset() {
    form.reset();
    form.setValues({ name: '' });
    onChange(initialValues);
  }

  return (
    <form onReset={handleReset}>
      <Group justify="flex-end" gap="sm">
        <DatePickerInput
          {...form.getInputProps('dateRange')}
          type="range"
          placeholder="00/00/0000 - 00/00/0000"
          rightSection={
            <RiCalendarLine size={'1.1rem'} style={{ color: '#547B9A' }} />
          }
          w={250}
          valueFormat="DD/MM/YYYY"
          onChange={() => {
            handleChange({
              ...form.values,
            });
          }}
        />

        <Select
          {...form.getInputProps('status')}
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
          {...form.getInputProps('name')}
          placeholder="Pesquise por nome"
          rightSection={<RiSearchLine style={iconStyle} />}
          onChange={(e) =>
            handleChange({ ...form.values, name: e.target.value })
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
