import {
  Button,
  Divider,
  Group,
  Modal,
  ModalProps,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { useEffect } from 'react';
import InputMask from '@/components/__commons/InputMask';
import {
  Users,
  UsersRequest,
  useCreateUsers,
  useEditUser,
} from '@/core/domain/users';

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

export function UsersModal({ users, ...props }: Props) {
  const createMutation = useCreateUsers();
  const editMutation = useEditUser();

  const form = useForm<UsersRequest>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      email: '',
      cellphone: '',
      profile: '',
    },
  });

  async function handleSaveUser(values: UsersRequest) {
    if (users) {
      await editMutation.mutateAsync({
        ...values,
        id: users.id,
      });
    } else {
      await createMutation.mutateAsync({
        ...values,
        profile: Number(values.profile),
      });
    }
    handleClose();
  }

  function handleClose() {
    form.reset();
    props.onClose();
  }

  useEffect(() => {
    if (users) {
      form.setValues({
        name: users?.name || '',
        email: users?.email || '',
        cellphone: users?.cellphone || '',
        profile: String(users.profile) || '',
      });
    }
  }, [users]);

  return (
    <Modal
      {...props}
      title={users ? 'Editar Usuário' : 'Novo Usuário'}
      centered
      onClose={handleClose}
    >
      <form onSubmit={form.onSubmit((values) => handleSaveUser(values))}>
        <Stack gap="md">
          <TextInput
            {...form.getInputProps('name')}
            label="Nome"
            placeholder="Adicione o nome do usuário"
            required
          />
          <Select
            {...form.getInputProps('profile')}
            label="Tipo de Usuário"
            placeholder="Selecione um tipo de usuário"
            required
            data={[
              {
                value: '0',
                label: 'Administrador',
              },
              {
                value: '1',
                label: 'Guardião Legal',
              },
              {
                value: '2',
                label: 'Colaborador',
              },
              {
                value: '3',
                label: 'Professor',
              },
            ]}
          />
          <TextInput
            {...form.getInputProps('email')}
            label="E-mail"
            placeholder="Adicione o e-mail"
            required
          />
          <InputMask
            masktype={'phoneNumber'}
            {...form.getInputProps('cellphone')}
            label="Telefone"
            placeholder="(00) 0000-0000"
          />
          <Divider />
          <Group gap="sm" justify="flex-end">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={createMutation.isLoading || editMutation.isLoading}
            >
              Salvar Usuário
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
