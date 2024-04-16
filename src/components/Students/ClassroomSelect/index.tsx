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
    <Skeleton visible={isLoading} width={props.width}>
      <Select
        placeholder="Turma"
        clearable
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

export default ClassroomSelect;
