import { useForm, yupResolver } from '@mantine/form';
import { Box, ModalProps, PasswordInput, Stack, Text } from '@mantine/core';
import * as Yup from 'yup';
import { RiLock2Line } from 'react-icons/ri';
import PasswordStrength from '@/components/__commons/PasswordInput';
import { ChangePasswordRequest } from '@/core/domain/users/users.types';
import { useChangePassword } from '@/core/domain/users/users.hooks';

const getCharacterValidationError = (str: string) => {
  return `A senha deve conter no mínimo um(a) ${str}`;
};
const schema = Yup.object().shape({
  currentPassword: Yup.string().required('Campo Obrigatório'),
  newPassword: Yup.string()
    .required('Campo Obrigatório')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .matches(/[0-9]/, getCharacterValidationError('número'))
    .matches(/[a-z]/, getCharacterValidationError('letra minúscula'))
    .matches(/[A-Z]/, getCharacterValidationError('letra maiúscula')),
  confirmPassword: Yup.string()
    .required('Campo Obrigatório')
    .oneOf([Yup.ref('newPassword')], 'As senhas não são iguais'),
});

const ChangePasswordForm: React.FC<ModalProps> = ({ onClose }) => {
  const changePasswordMutation = useChangePassword();
  const form = useForm<ChangePasswordRequest>({
    validate: yupResolver(schema),
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function handleResetPassword(values: ChangePasswordRequest) {
    console.log(values);
    await changePasswordMutation.mutateAsync(values);
    form.reset();
    onClose();
  }

  return (
    <>
      <form onSubmit={form.onSubmit(handleResetPassword)}>
        <Stack gap={'md'}>
          <Box>
            <Text color="dimmed">
              Preeencha os campos abaixo para alterar a senha da sua conta.
            </Text>
          </Box>

          <Stack>
            <PasswordInput
              withAsterisk
              label="Senha Atual"
              placeholder="********"
              leftSection={<RiLock2Line size={16} />}
              {...form.getInputProps('currentPassword')}
            />
            <PasswordStrength
              isLoading={changePasswordMutation.isLoading}
              form={form}
            />
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default ChangePasswordForm;
