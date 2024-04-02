import {
  Button,
  Divider,
  Grid,
  Group,
  Modal,
  ModalProps,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { Users, useEditUser } from '@/core/domain/users';
import { LegalGuardiansRequest } from '@/core/domain/students/students.types';
import { useCreateLegalGuardians } from '@/core/domain/students/students.hooks';

type Props = ModalProps & {
  users?: Users;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Campo Obrigatório'),
  email: Yup.string()
    .required('Campo Obrigatório')
    .email('Informe um e-mail válido'),
  profile: Yup.string().required('Campo Obrigatório'),
});

export function LegalGuardianModal({ ...props }: Props) {
  const createMutation = useCreateLegalGuardians();
  const editMutation = useEditUser();

  const form = useForm<LegalGuardiansRequest>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      email: '',
      cellphone: '',
      legalGuardianType: '',
      address: {
        name: '',
        cep: '',
        complement: '',
        district: '',
        number: '',
        reference: '',
        street: '',
        telephone: '',
      },
    },
  });

  async function handleSaveUser(values: LegalGuardiansRequest) {
    await createMutation.mutateAsync({
      ...values,
    });
    handleClose();
  }

  function handleClose() {
    form.reset();
    props.onClose();
  }

  //   useEffect(() => {
  //     if (users) {
  //       form.setValues({
  //         name: users?.name || '',
  //         email: users?.email || '',
  //         cellphone: users?.cellphone || '',
  //       });
  //     }
  //   }, [users]);

  return (
    <>
      <Modal
        {...props}
        size={1800}
        title={'Novo Representante Legal'}
        centered
        onClose={handleClose}
      >
        <form onSubmit={form.onSubmit((values) => handleSaveUser(values))}>
          <Stack gap="md">
            <Grid>
              <Grid.Col span={8}>
                <TextInput
                  {...form.getInputProps('legalGuardians.name')}
                  label="Representanate Legal"
                  placeholder="Adicione o nome do  representante legal"
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  {...form.getInputProps('legalGuardian.legalGuardianType')}
                  label="Parentesco"
                  placeholder="Adicione o parentesco com o aluno"
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  {...form.getInputProps('legalGuardian.email')}
                  label="E-mail"
                  placeholder="Adicione o e-mail"
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  {...form.getInputProps('legalGuardian.address.telephone')}
                  label="Telefone"
                  placeholder="Adicione o telefone"
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  {...form.getInputProps('legalGuardian.legalGuardianType')}
                  label="Profissão"
                  placeholder="Adicione a profissão"
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  {...form.getInputProps('legalGuardian.legalGuardianType')}
                  label="Local de Trabalho"
                  placeholder="Adicione o local de trabalho"
                  required
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <TextInput
                  {...form.getInputProps('legalGuardian.address.cep')}
                  label="CEP"
                  placeholder="00000-000"
                  required
                />
              </Grid.Col>
              <Grid.Col span={5}>
                <TextInput
                  {...form.getInputProps('legalGuardian.address.street')}
                  label="Endereço Residencial"
                  placeholder="Rua Niterói, Centro, São Caetano do Sul, São Paulo"
                  required
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <TextInput
                  {...form.getInputProps('legalGuardian.address.number')}
                  label="Número"
                  placeholder="Adicione o número"
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  {...form.getInputProps('legalGuardian.address.complement')}
                  label="Complemento"
                  placeholder="Adicione o Complemento"
                  required
                />
              </Grid.Col>
            </Grid>
            <Divider />
            <Group gap="sm" justify="flex-end">
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={createMutation.isLoading || editMutation.isLoading}
              >
                Salvar
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
