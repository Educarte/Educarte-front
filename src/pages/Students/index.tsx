import { useState } from 'react';
import { Button, Center, Stack } from '@mantine/core';
import { PageContainer } from '@/components/__commons';
import { useDebouncedValue } from '@mantine/hooks';
import { StudentsFilters } from '@/components/Students/Filters';
import { useStudents } from '@/core/domain/students/students.hooks';
import { ListStudentsQuery } from '@/core/domain/students/students.types';
import { StudentsList } from '@/components/Students/List';
import { RiAddLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export default function StudentsPage() {
  const [params, setParams] = useState<ListStudentsQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data, isLoading } = useStudents(debounced);
  const navigate = useNavigate();

  return (
    <Stack gap="md">
      <StudentsFilters onChange={setParams} />
      <PageContainer
        title="Alunos"
        description="Gerencie todas os alunos da plataforma"
        rightSection={
          <Button
            variant="filled"
            onClick={() => navigate('/app/students/register')}
          >
            <Center>
              <RiAddLine style={{ marginRight: '0.5em' }} />
              Novo Aluno
            </Center>
          </Button>
        }
      >
        <StudentsList
          data={data}
          loading={isLoading}
          onPaginate={(page) => setParams((params) => ({ ...params, page }))}
        />
      </PageContainer>
    </Stack>
  );
}
