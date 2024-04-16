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
import { StudentsSelectProps } from './StudentsSelect.types';
import { StudentsList } from '@/core/domain/messages/messages.types';
import { useStudentsListInfinite } from '@/core/domain/messages/messages.hooks';
import flatInfiniteData from '@/core/utils/flatInfiniteData';

const StudentsSelect: React.FC<StudentsSelectProps> = (props) => {
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
  } = useStudentsListInfinite({
    search: searchDebounced,
  });

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage]);

  const items = flatInfiniteData(data);

  const selectMap = (student: StudentsList) => ({
    value: String(student.id),
    label: student.name,
  });

  const selectData: ComboboxData = [
    ...items
      .filter(
        (map) =>
          !props.students?.some((propStudents) => propStudents.id === map.id)
      )
      .map(selectMap),
    ...(props.students?.map(selectMap) || []),
  ];

  return (
    <Skeleton visible={isLoading} width={props.width}>
      <MultiSelect
        placeholder="Adicione o destinatário do recado"
        clearable
        rightSection={isFetching ? <Loader size={18} /> : undefined}
        rightSectionWidth={40}
        searchable
        value={props.defaultValue}
        data={selectData}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        descriptionProps={({ ...params }: any) => {
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

export default StudentsSelect;
