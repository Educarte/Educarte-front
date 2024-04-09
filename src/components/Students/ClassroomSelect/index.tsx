import { useEffect } from 'react';
import { Box, ComboboxData, Select, Skeleton, Text } from '@mantine/core';
import { ClassroomList } from '@/core/domain/messages/messages.types';
import { useClassroomListInfinite } from '@/core/domain/messages/messages.hooks';
import flatInfiniteData from '@/core/utils/flatInfiniteData';
import { ClassroomSelectProps } from './StudentsSelect.types';

const ClassroomSelect: React.FC<ClassroomSelectProps> = (props) => {
  const { data, hasNextPage, fetchNextPage, status, error, isLoading } =
    useClassroomListInfinite();

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage]);

  const items = flatInfiniteData(data);

  const selectMap = (classroom: ClassroomList) => ({
    value: String(classroom.id),
    label: classroom.name,
  });

  const selectData: ComboboxData = [
    ...items
      .filter((map) => !props.classroom?.some((props) => props.id === map.id))
      .map(selectMap),
    ...(props.classroom?.map(selectMap) || []),
  ];

  return (
    <Skeleton visible={isLoading} width="18%">
      <Select
        placeholder="Turma"
        clearable
        // leftSection={hasNextPage ? (
        //   <ThemeIcon title='Carregar mais itens'>
        //     <RiLoopRightLine
        //       onClick={() => fetchNextPage()}
        //       style={iconStyle}
        //     />
        //   </ThemeIcon >
        // ) : null}
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
                <>{children}</>
              )}
            </Box>
          );
        }}
        {...props}
      />
    </Skeleton>
  );
};

export default ClassroomSelect;
