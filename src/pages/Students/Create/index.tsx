import { useState } from 'react';
import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PageContainer } from '@/components/__commons';
import { StudentsRequest } from '@/core/domain/students/students.types';
import { StudentsForm } from '@/components/Students/Form';
import { useCreateStudents } from '@/core/domain/students/students.hooks';
import { useNavigate } from 'react-router-dom';

export default function StudentsCreatePage() {
  const [image, setImage] = useState<string | null>(null);
  const createMutation = useCreateStudents();
  const navigate = useNavigate();
  const form = useForm<StudentsRequest>({
    initialValues: {
      name: '',
      naturalness: '',
      healthProblem: '',
      specialChild: '',
      classroomId: null,
      time: 0,
      genre: 0,
      allergicBugBite: '',
      allergicFood: '',
      allergicMedicine: '',
      birthDate: undefined,
      bloodType: undefined,
      contact1: { name: '', telephone: '' },
      contact2: { name: '', telephone: '' },
      contact3: { name: '', telephone: '' },
      emergencyContacts: [],
      contractedHours: [],
      contractedHoursValue: {
        endDate: null,
        startDate: null,
        hours: null,
      },
      profession: '',
      workplace: '',

      legalGuardiansValue: {
        name: '',
        cellphone: '',
        email: '',
        legalGuardianType: '',
        address: {
          cep: '',
          complement: '',
          district: '',
          name: '',
          street: '',
          number: '',
          reference: '',
          telephone: '',
        },
        id: null,
      },
    },
  });

  async function handleCreate(values: StudentsRequest) {
    await createMutation.mutateAsync({
      ...values,

      genre: Number(values.genre),
      epilepsy: values.epilepsy === true ? true : false,
      specialChild: values.specialChild === 'false' ? 'false' : 'true',
      allergicBugBite:
        values.allergicBugBiteToggle === 'true'
          ? values.allergicBugBite
          : 'false',
      allergicFood:
        values.allergicFoodToggle === 'true' ? values.allergicFood : 'false',
      healthProblem:
        values.healthProblemToggle === 'true' ? values.healthProblem : 'false',
      allergicMedicine:
        values.allergicMedicineToggle === 'true'
          ? values.allergicMedicine
          : 'false',

      legalGuardian: {
        name: values.legalGuardiansValue.name,
        email: values.legalGuardiansValue.email,
        cellphone: values.legalGuardiansValue.cellphone,
        legalGuardianType: values.legalGuardiansValue.legalGuardianType,
        profession: values.legalGuardiansValue.profession,
        workplace: values.legalGuardiansValue.workplace,
        address: {
          cep: values.legalGuardiansValue.address.cep,
          street: values.legalGuardiansValue.address.street,
          complement: values.legalGuardiansValue.address.complement,
          number: values.legalGuardiansValue.address.number,
        },
      },

      contractedHours: [
        {
          hours: values.contractedHoursValue?.hours,
          endDate: values.contractedHoursValue?.endDate,
          startDate: values.contractedHoursValue?.startDate,
        },
      ],
    });
    navigate('/app/students');
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleCreate(values))}>
      <PageContainer
        title="Novo Aluno"
        rightSection={
          <Button type="submit" loading={createMutation.isLoading}>
            Cadastrar Novo Aluno
          </Button>
        }
        backTo="/app/students"
      >
        <StudentsForm
          form={form}
          defaultImage={image}
          onUploadFinish={setImage}
        />
      </PageContainer>
    </form>
  );
}
