import {
  Grid,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import * as Yup from 'yup';

import { RiArrowDropDownLine } from 'react-icons/ri';
import {
  Classroom,
  ClassroomRequest,
  Students,
} from '@/core/domain/classroom/classroom.types';
import StudentsSelect from '@/components/Messages/StudentsSelect';
import TeachersSelect from '../TeacherSelect';
import EmployeesSelect from '../EmployeesSelect';
import { useEffect } from 'react';
import { SimpleStudentList } from '../TableStudent';

interface Props {
  form: UseFormReturnType<ClassroomRequest>;
  activeId?: string;
  data?: Classroom;
  students?: Students[];
  setStudents: React.Dispatch<React.SetStateAction<Students[] | undefined>>;
}

export const activeSchema = Yup.object().shape({
  name: Yup.string().required('Campo Obrigatório'),
});

export function ClassroomForm({ form, data, students, setStudents }: Props) {
  const iconStyle = {
    color: 'var(--mantine-color-primary-4)',
    fontSize: 25,
    cursor: 'pointer',
  };

  useEffect(() => {
    if (data) {
      form.setValues({
        name: data?.name,
        classroomType: String(data.classroomType),
        maxStudents: data.maxStudents,
        time: String(data.time),
        teacherIds: data.teachers
          .filter((teacher) => teacher.profile !== 2)
          .map((teacher) => teacher.id),
        employeesIds: data.teachers
          .filter((teacher) => teacher.profile === 2)
          .map((teacher) => teacher.id),
        studentIds: data.students.map((student) => {
          return student.id;
        }),
      });
    }
  }, [data]);

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
          <Stack>
            <Text c="dimmed">Dados Gerais</Text>
            <Grid>
              <Grid.Col span={12}>
                <TextInput
                  {...form.getInputProps('name')}
                  label="Nome"
                  placeholder="Adicione o nome da turma"
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  {...form.getInputProps('classroomType')}
                  label="Faixa etária"
                  rightSection={<RiArrowDropDownLine style={iconStyle} />}
                  data={[
                    {
                      label: '0 meses até 11 meses',
                      value: '0',
                    },
                    {
                      label: '12 meses até 1 ano e 11 meses',
                      value: '1',
                    },
                    {
                      label: 'até 24 meses completos',
                      value: '2',
                    },
                    {
                      label: 'até 36 meses completos',
                      value: '3',
                    },
                    {
                      label: 'até 4 anos completos',
                      value: '4',
                    },
                    {
                      label: 'até 5 anos completos',
                      value: '5',
                    },
                    {
                      label: 'de 4 meses até 6 anos',
                      value: '6',
                    },
                  ]}
                  placeholder="Adicione a faixa etária dos alunos"
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  {...form.getInputProps('maxStudents')}
                  label="Quantidade Máxima de Alunos"
                  placeholder="Adicione a quantidade de alunos"
                  required
                  onChange={(value) => {
                    form.setFieldValue(
                      'maxStudents',
                      value ? Number(value) : null
                    );
                    form.setFieldValue('studentIds', []);
                  }}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  {...form.getInputProps('time')}
                  label="Turno"
                  rightSection={<RiArrowDropDownLine style={iconStyle} />}
                  data={[
                    {
                      label: 'Matutino',
                      value: '0',
                    },
                    {
                      label: 'Vespertino',
                      value: '1',
                    },
                    {
                      label: 'Integral',
                      value: '2',
                    },
                  ]}
                  placeholder="Vespertino"
                  required
                />
              </Grid.Col>
              <Grid.Col mt={'lg'} span={12}>
                <TeachersSelect
                  {...form.getInputProps('teacherIds')}
                  label="Responsável"
                />
              </Grid.Col>

              <Grid.Col mt={'lg'} span={12}>
                <EmployeesSelect
                  {...form.getInputProps('employeesIds')}
                  label="Auxiliar ou Estagiário (a)"
                />
              </Grid.Col>

              <Grid.Col mt={'lg'} span={12}>
                <StudentsSelect
                  label="Adicione um novo aluno"
                  placeholder="Selecione um aluno cadastrado na plataforma para ser integrado a turma"
                  {...form.getInputProps('studentIds')}
                  disabled={!form.values.maxStudents}
                  maxValues={form?.values?.maxStudents ?? 1}
                />
              </Grid.Col>
              {data && (
                <Grid.Col>
                  <SimpleStudentList
                    students={students}
                    data={data.students}
                    setStudents={setStudents}
                  />
                </Grid.Col>
              )}
            </Grid>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
}
