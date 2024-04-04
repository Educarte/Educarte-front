import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';

import { PageContainer } from '@/components/__commons';
import { ClassroomForm } from '@/components/Classes/Form';
import {
  ClassroomRequest,
  Students,
} from '@/core/domain/classroom/classroom.types';
import {
  useClassroom,
  useEditClasses,
} from '@/core/domain/classroom/classroom.hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function ClassesEditPage() {
  const editMutation = useEditClasses();
  const navigate = useNavigate();
  const { classesId } = useParams();
  const { data } = useClassroom(classesId);
  const [students, setStudents] = useState<Students[]>();

  console.log('dataaaa', data);

  const form = useForm<ClassroomRequest>({
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

  async function handleEdit(values: ClassroomRequest) {
    await editMutation.mutateAsync({
      ...values,
      id: classesId,
      classroomType: Number(values.classroomType),
      status: 0,
      time: Number(values.time),
      teacherIds: values.teacherIds.concat(values.employeesIds),
      studentIds: values?.studentIds,
    });
    navigate('/app/classes');
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleEdit(values))}>
      <PageContainer
        title="Turma"
        rightSection={
          <Button type="submit" loading={editMutation.isLoading}>
            Editar Turma
          </Button>
        }
        backTo="/app/classes"
      >
        <ClassroomForm
          students={students}
          setStudents={setStudents}
          data={data}
          form={form}
        />
      </PageContainer>
    </form>
  );
}
