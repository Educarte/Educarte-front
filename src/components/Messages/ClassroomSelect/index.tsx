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
import { ClassroomsSelectProps } from './ClassroomsSelect.types';
import { StudentsList } from '@/core/domain/messages/messages.types';
import { useClassroomListInfinite } from '@/core/domain/messages/messages.hooks';
import flatInfiniteData from '@/core/utils/flatInfiniteData';

const ClassroomsSelect: React.FC<ClassroomsSelectProps> = (props) => {
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
  } = useClassroomListInfinite({
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
          !props.classroom?.some((propClassroom) => propClassroom.id === map.id)
      )
      .map(selectMap),
    ...(props.classroom?.map(selectMap) || []),
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
      // eslint-disable-next-line
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

export default ClassroomsSelect;
