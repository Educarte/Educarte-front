import {
  Button,
  Card,
  Center,
  PasswordInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { RiLock2Line } from 'react-icons/ri';
import {
  ForgotPasswordRequest,
  useForgotPassword,
  useVerifyCode,
} from '@/core/domain/users';
import { useEffect } from 'react';

const getCharacterValidationError = (str: string) => {
  return `A senha deve conter no mínimo um(a) ${str}`;
};

const schema = Yup.object().shape({
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

export default function ResetPage() {
  const { code } = useParams();
  const { data, isLoading } = useVerifyCode({ code });
  const forgotPasswordMutation = useForgotPassword();
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordRequest>({
    validate: yupResolver(schema),
    initialValues: {
      code,
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function handleResetPassword(values: ForgotPasswordRequest) {
    await forgotPasswordMutation.mutateAsync(values);
  }

  useEffect(() => {
    if (!isLoading && data === undefined) {
      navigate('/forgot');
    }
  }, [data, isLoading, navigate]);

  return (
    <Center h="100%">
      <Card withBorder w={400}>
        <form onSubmit={form.onSubmit((values) => handleResetPassword(values))}>
          <Stack gap="md">
            <Title order={2}>Alterar Senha</Title>
            <Text>Informe sua nova senha.</Text>
            <PasswordInput
              withAsterisk
              label="Nova Senha"
              placeholder="********"
              leftSection={<RiLock2Line size={16} />}
              disabled={isLoading}
              {...form.getInputProps('newPassword')}
            />
            <PasswordInput
              withAsterisk
              label="Confirmar Senha"
              placeholder="********"
              leftSection={<RiLock2Line size={16} />}
              disabled={isLoading}
              {...form.getInputProps('confirmPassword')}
            />
            <Button
              fullWidth
              disabled={isLoading}
              loading={isLoading || forgotPasswordMutation.isLoading}
              type="submit"
            >
              Alterar Senha
            </Button>
          </Stack>
        </form>
      </Card>
    </Center>
  );
}
