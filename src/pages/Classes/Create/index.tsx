import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';

import { PageContainer } from '@/components/__commons';
import { ClassroomForm } from '@/components/Classes/Form';
import { ClassroomRequest } from '@/core/domain/classroom/classroom.types';
import { useCreateClassroom } from '@/core/domain/classroom/classroom.hooks';
import { useNavigate } from 'react-router-dom';

export default function ClassesCreatePage() {
  // const [image, setImage] = useState<string | null>(null);
  const createMutation = useCreateClassroom();
  const navigate = useNavigate();

  const form = useForm<ClassroomRequest>({
    // validate: yupResolver(activeSchema),
    initialValues: {
      name: '',
      classroomType: null,
      maxStudents: null,
      status: null,
      studentIds: [],
      teacherIds: [],
      employeesIds: [],
      time: null,
    },
  });

  async function handleCreate(values: ClassroomRequest) {
    await createMutation.mutateAsync({
      ...values,
      classroomType: Number(values.classroomType),
      status: 0,
      time: Number(values.time),
      teacherIds: values.teacherIds.concat(values.employeesIds),
    });
    navigate('/app/classes');
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleCreate(values))}>
      <PageContainer
        title="Nova Turma"
        rightSection={
          <Button type="submit" loading={createMutation.isLoading}>
            Cadastrar Nova Turma
          </Button>
        }
        backTo="/app/classes"
      >
        <ClassroomForm
          form={form}
          setStudents={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </PageContainer>
    </form>
  );
}
