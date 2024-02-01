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
import {
  UserRequest,
  User,
  useCreateUser,
  useEditUser,
} from '@/core/domain/users';
import { useEffect } from 'react';
import InputMask from '@/components/__commons/InputMask';

type Props = ModalProps & {
  user?: User;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Campo Obrigatório'),
  email: Yup.string()
    .required('Campo Obrigatório')
    .email('Informe um e-mail válido'),
  cellphone: Yup.string().required('Campo Obrigatório'),
  roleId: Yup.string().required('Campo Obrigatório'),
});

export function UserModal({ user, ...props }: Props) {
  const createMutation = useCreateUser();
  const editMutation = useEditUser();

  const form = useForm<UserRequest>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      email: '',
      cellphone: '',
      roleId: '',
    },
  });

  async function handleSaveUser(values: UserRequest) {
    if (user) {
      await editMutation.mutateAsync({
        ...values,
        id: user.id,
      });
    } else {
      await createMutation.mutateAsync(values);
    }
    handleClose();
  }

  function handleClose() {
    form.reset();
    props.onClose();
  }

  useEffect(() => {
    if (user) {
      form.setValues({
        name: user?.name || '',
        email: user?.email || '',
        cellphone: user?.cellphone || '',
        roleId: user?.role.id || '',
      });
    }
  }, [user]);

  return (
    <Modal
      {...props}
      title={user ? 'Editar Usuário' : 'Novo usuário'}
      centered
      onClose={handleClose}
    >
      <form onSubmit={form.onSubmit((values) => handleSaveUser(values))}>
        <Stack gap="md">
          <TextInput
            {...form.getInputProps('name')}
            label="Nome"
            placeholder="Adicione o nome do usuário"
            withAsterisk
          />
          <TextInput
            {...form.getInputProps('email')}
            label="E-mail"
            placeholder="Adicione o e-mail"
            withAsterisk
          />
          <InputMask
            masktype={'phoneNumber'}
            {...form.getInputProps('cellphone')}
            label="Telefone"
            placeholder="(00) 0000-0000"
            withAsterisk
          />
          <Select
            {...form.getInputProps('roleId')}
            label="Tipo de Usuário"
            placeholder="Selecione um tipo de usuário"
            withAsterisk
            data={[
              {
                value: '0e6cf42b-f9d2-4bec-bb5d-7410be8bb6ee',
                label: 'Administrador',
              },
              {
                value: 'cedc36a8-b1c3-42fa-9bc6-e2e9585b7601',
                label: 'Entregador',
              },
            ]}
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
