import { useState } from 'react';
import { Button, Center, Stack } from '@mantine/core';
import { PageContainer } from '@/components/__commons';
import { useDebouncedValue } from '@mantine/hooks';
import { ClassesFilters } from '@/components/Classes/Filters';
import { useClassrooms } from '@/core/domain/classroom/classroom.hooks';
import { ListClassroomQuery } from '@/core/domain/classroom/classroom.types';
import { ClassroomSmartTableList } from '@/components/Classes/ListSmartTable';
import { RiAddLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export default function ClassesPage() {
  const [params, setParams] = useState<ListClassroomQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data, isLoading } = useClassrooms(debounced);
  const navigate = useNavigate();

  return (
    <Stack gap="md">
      <ClassesFilters onChange={setParams} />
      <PageContainer
        title="Turmas"
        description="Gerencie todas as turmas da plataforma"
        rightSection={
          <Button
            variant="filled"
            onClick={() => navigate('/app/classroom/register')}
          >
            <Center>
              <RiAddLine style={{ marginRight: '0.5em' }} />
              Novo Turma
            </Center>
          </Button>
        }
      >
        <ClassroomSmartTableList
          onSelectClassroom={(classroom) => {
            // setSelected(classroom);
            classroom;
            open();
          }}
          data={data}
          loading={isLoading}
        />
      </PageContainer>
    </Stack>
  );
}
