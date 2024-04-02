import { ListRegisterQuery } from '@/core/domain/register/register.types';
import { Button, Group } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { RiCalendarLine } from 'react-icons/ri';

interface Props {
  onChange: (values: ListRegisterQuery) => void;
}

const iconStyle = {
  color: 'var(--mantine-color-primary-9)',
  fontSize: 15,
};

export function RegistersEditFilters({ onChange }: Props) {
  const initialValues: ListRegisterQuery = {
    page: 1,
    pageSize: 30,
    startDate: new Date(),
    endDate: new Date(),
  };

  const form = useForm<ListRegisterQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: ListRegisterQuery) {
    form.setValues({ ...values });
    onChange({ ...values });
  }

  function handleReset() {
    form.reset();
    form.setValues({ endDate: null, startDate: null });
    onChange({
      page: 1,
      pageSize: 30,
      startDate: undefined,
      endDate: undefined,
    });
  }

  return (
    <form onReset={handleReset}>
      <Group justify="flex-end" gap="sm">
        <DateInput
          {...form.getInputProps('startDate')}
          placeholder="Data Inicial"
          valueFormat="DD/MM/YYYY"
          onChange={(e) =>
            handleChange({ ...form.values, startDate: new Date(String(e)) })
          }
          rightSection={<RiCalendarLine size={'1.1rem'} style={iconStyle} />}
        />
        <DateInput
          {...form.getInputProps('endDate')}
          placeholder="Data Final"
          valueFormat="DD/MM/YYYY"
          onChange={(e) =>
            handleChange({ ...form.values, endDate: new Date(String(e)) })
          }
          rightSection={<RiCalendarLine size={'1.1rem'} style={iconStyle} />}
        />

        <Button size="sm" variant="outline" type="reset" onClick={handleReset}>
          Limpar filtros
        </Button>
      </Group>
    </form>
  );
}
