import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import {
  Box,
  ComboboxData,
  Loader,
  MultiSelect,
  Skeleton,
  Text,
} from '@mantine/core';
import flatInfiniteData from '@/core/utils/flatInfiniteData';
import { EmployeesSelectProps } from './EmployeesSelect.types';
import { useEmployeesListInfinite } from '@/core/domain/classroom/classroom.hooks';
import { EmployeesList } from '@/core/domain/classroom/classroom.types';

const EmployeesSelect: React.FC<EmployeesSelectProps> = (props) => {
  const [search] = useState('');
  const [searchDebounced] = useDebouncedValue(search, 500);

  const {
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    status,
    error,
    isLoading,
  } = useEmployeesListInfinite({
    search: searchDebounced,
    profile: 2,
  });

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage]);

  const items = flatInfiniteData(data);

  const selectMap = (employee: EmployeesList) => ({
    value: String(employee.id),
    label: employee.name,
  });

  const selectData: ComboboxData = [
    ...items
      .filter(
        (map) =>
          !props.employees?.some((propEmployees) => propEmployees.id === map.id)
      )
      .map(selectMap),
    ...(props.employees?.map(selectMap) || []),
  ];

  return (
    <Skeleton visible={isLoading} width={props.width}>
      <MultiSelect
        placeholder="Adicione o colaborador auxiliar da turma"
        clearable
        rightSection={isFetching ? <Loader size={18} /> : undefined}
        rightSectionWidth={40}
        searchable
        value={props.defaultValue}
        data={selectData}
        // eslint-disable-next-line
        descriptionProps={({ children, ...params }: any) => {
          return (
            <Box {...params}>
              {status === 'error' ? <Text>Erro: {error.message}</Text> : null}
            </Box>
          );
        }}
        {...props}
      />
    </Skeleton>
  );
};

export default EmployeesSelect;
