import { ListMessagesQuery } from '@/core/domain/messages/messages.types';
import { Button, Group, Input, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
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
  status: null,
  startDate: null,
  endDate: null,
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
    });

    if (dayjs(values?.endDate).isBefore(values?.startDate, 'day')) {
      form.setFieldError(
        'endDate',
        'A data de fim precisa ser depois da data de início'
      );
      return;
    }

    onChange({
      ...values,
      startDate: values?.startDate ? new Date(values.startDate) : null,
      endDate: values?.endDate ? new Date(values.endDate) : null,
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
        <DatePickerInput
          {...form.getInputProps('startDate')}
          clearable
          placeholder="Data inicial"
          rightSection={
            <RiCalendarLine size={'1.1rem'} style={{ color: '#547B9A' }} />
          }
          w={250}
          valueFormat="DD/MM/YYYY"
          onChange={(e) => {
            handleChange({
              ...form.values,
              startDate: e,
            });
          }}
        />

        <DatePickerInput
          {...form.getInputProps('endDate')}
          clearable
          placeholder="Data final"
          rightSection={
            <RiCalendarLine size={'1.1rem'} style={{ color: '#547B9A' }} />
          }
          w={250}
          valueFormat="DD/MM/YYYY"
          onChange={(e) => {
            handleChange({
              ...form.values,
              endDate: e,
            });
          }}
          styles={{
            error: {
              position: 'absolute',
            },
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
              status: e,
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
