import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PageContainer } from '@/components/__commons';
import { StudentsEditRequest } from '@/core/domain/students/students.types';
import {
  useEditStudent,
  useStudent,
} from '@/core/domain/students/students.hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { StudentsEditForm } from '@/components/Students/FormEdit';
import { removeMask } from '@/core/utils/removeMask';

export default function StudentsEditPage() {
  const editMutation = useEditStudent();
  const { studentId } = useParams();
  const { data } = useStudent(studentId);
  const navigate = useNavigate();
  const form = useForm<StudentsEditRequest>({
    initialValues: {
      name: '',
      naturalness: '',
      healthProblem: '',
      specialChild: '',
      time: 0,
      genre: 0,
      allergicBugBite: '',
      allergicFood: '',
      allergicMedicine: '',
      birthDate: undefined,
      bloodType: undefined,
      emergencyContacts: [],
      contractedHours: [],
      epilepsy: null,
      specialChildHasReport: null,
      contact1: {
        name: '',
        telephone: '',
      },
      contact2: {
        name: '',
        telephone: '',
      },
      contact3: {
        name: '',
        telephone: '',
      },
    },
  });

  async function handleEdit(values: StudentsEditRequest) {
    await editMutation.mutateAsync({
      id: studentId,
      ...values,
      emergencyContacts: values.emergencyContacts,
      genre: Number(values.genre),
      epilepsy: values.epilepsy === true ? true : false,
      specialChild: values.specialChild === 'false' ? 'false' : 'true',
      specialChildHasReport: false,
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
      contractedHours: [
        {
          id: data?.contractedHours[0].id,
          startDate: new Date(values.contractedHoursValue?.startDate || ''),
          endDate: new Date(values.contractedHoursValue?.endDate || ''),
          hours: Number(values.contractedHoursValue?.hours),
        },
      ],
      legalGuardian: {
        id: data?.legalGuardian?.id,
        name: String(values.legalGuardiansValue?.name),
        email: String(values.legalGuardiansValue?.email),
        cellphone: removeMask(String(values.legalGuardiansValue?.cellphone)),
        legalGuardianType: String(
          values.legalGuardiansValue?.legalGuardianType
        ),
        profession: String(values.legalGuardiansValue?.profession),
        workplace: String(values.legalGuardiansValue?.workplace),
        address: {
          id: data?.legalGuardian?.address.id,
          cep: removeMask(String(values.legalGuardiansValue?.address.cep)),
          street: String(values.legalGuardiansValue?.address.street),
          complement: String(values.legalGuardiansValue?.address.complement),
          number: String(values.legalGuardiansValue?.address.number),
        },
      },
    });
    navigate('/app/students');
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleEdit(values))}>
      <PageContainer
        title="Editar Aluno"
        rightSection={
          <Button type="submit" loading={editMutation.isLoading}>
            Salvar
          </Button>
        }
        backTo="/app/students"
      >
        <StudentsEditForm form={form} data={data} />
      </PageContainer>
    </form>
  );
}
