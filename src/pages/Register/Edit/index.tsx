import { Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PageContainer } from '@/components/__commons';
import { useNavigate, useParams } from 'react-router-dom';
import { RegisterForm } from '@/components/Register/Form';
import { useRegister } from '@/core/domain/register/register.hooks';
import {
  ListRegisterQuery,
  Register,
} from '@/core/domain/register/register.types';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { RegistersEditFilters } from '@/components/Register/EditFilter';

export default function RegisterEditPage() {
  // const editMutation = useEditClasses();
  const navigate = useNavigate();
  const { registerId } = useParams();
  const [params, setParams] = useState<ListRegisterQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data } = useRegister(debounced, registerId);

  useEffect(() => {
    setParams({ startDate: new Date(), endDate: new Date() });
  }, []);
  const form = useForm<Register>({
    initialValues: {
      student: {
        name: '',
        id: '',
        genre: null,
        time: null,
        status: null,
        birthDate: null,
        bloodType: '',
      },
      accessControlsByDate: [
        {
          accessControls: [
            {
              accessControlType: '',
              time: '',
              id: '',
            },
          ],
          contractedHour: {
            id: '',
            endDate: null,
            startDate: null,
            hours: null,
            status: null,
          },
          date: null,
          dailySummary: '',
        },
      ],
      summary: '',
    },
  });

  async function handleEdit() {
    // await editMutation.mutateAsync({
    //   ...values,
    //   id: registerId,
    //   classroomType: Number(values.classroomType),
    //   status: 0,
    //   time: Number(values.time),
    //   teacherIds: values.teacherIds.concat(values.employeesIds),
    // });
    navigate('/app/classes');
  }

  return (
    <form onSubmit={form.onSubmit(() => handleEdit())}>
      <Stack>
        <RegistersEditFilters onChange={setParams} />

        <PageContainer title="Aluno" backTo="/app/register">
          <RegisterForm
            registerId={registerId}
            params={params}
            data={data}
            form={form}
          />
        </PageContainer>
      </Stack>
    </form>
  );
}
