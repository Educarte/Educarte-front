import { useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import {
  Box,
  Button,
  ComboboxData,
  Loader,
  MultiSelect,
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
    isFetchingNextPage,
    error,
    isLoading,
  } = useStudentsListInfinite({
    search: searchDebounced,
  });

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
    <MultiSelect
      placeholder="Adicione o destinatário do recado"
      clearable
      rightSection={isFetching ? <Loader size={18} /> : undefined}
      rightSectionWidth={40}
      searchable
      value={props.defaultValue}
      data={selectData}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptionProps={({ children, ...params }: any) => {
        return (
          <Box {...params}>
            {status === 'error' ? (
              <Text>Erro: {error.message}</Text>
            ) : (
              <>
                {children}
                <Box>
                  {hasNextPage ? (
                    <Button
                      onClick={() => fetchNextPage()}
                      disabled={!hasNextPage || isFetchingNextPage}
                      mt={10}
                      fullWidth
                      loading={isLoading || isFetching}
                    >
                      {isFetchingNextPage
                        ? 'Carregando...'
                        : hasNextPage
                        ? 'Carregar mais'
                        : null}
                    </Button>
                  ) : null}
                </Box>
              </>
            )}
          </Box>
        );
      }}
      {...props}
    />
  );
};

export default StudentsSelect;
