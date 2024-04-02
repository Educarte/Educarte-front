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
import { StudentsList } from '@/core/domain/messages/messages.types';
import flatInfiniteData from '@/core/utils/flatInfiniteData';
import { TeacherSelectProps } from './TeacherSelect.types';
import { useTeachersListInfinite } from '@/core/domain/classroom/classroom.hooks';

const TeachersSelect: React.FC<TeacherSelectProps> = (props) => {
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
  } = useTeachersListInfinite({
    search: searchDebounced,
    profile: 3,
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
          !props.teachers?.some((propTeachers) => propTeachers.id === map.id)
      )
      .map(selectMap),
    ...(props.teachers?.map(selectMap) || []),
  ];

  return (
    <MultiSelect
      placeholder="Adicione o responsável da turma"
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

export default TeachersSelect;
