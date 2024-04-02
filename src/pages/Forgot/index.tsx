import {
  Anchor,
  Button,
  Card,
  Center,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { RiMailLine } from 'react-icons/ri';
import { ResetPasswordRequest, useResetPassword } from '@/core/domain/users';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Campo Obrigatório')
    .email('Informe um e-mail válido'),
});

export default function ForgotPage() {
  const resetPasswordMutation = useResetPassword();

  const form = useForm<ResetPasswordRequest>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
    },
  });

  async function handleForgotPassword(values: ResetPasswordRequest) {
    await resetPasswordMutation.mutateAsync(values);
    form.reset();
  }

  return (
    <Center h="100%">
      <Card withBorder w={400}>
        <form
          onSubmit={form.onSubmit((values) => handleForgotPassword(values))}
        >
          <Stack gap="md">
            <Title order={2}>Recuperar senha</Title>
            <Text>
              Informe seu e-mail para realizar a recuperação da senha.
            </Text>
            <TextInput
              withAsterisk
              label="E-mail"
              placeholder="exemplo@email.com"
              leftSection={<RiMailLine size={16} />}
              {...form.getInputProps('email')}
            />
            <Button
              fullWidth
              type="submit"
              loading={resetPasswordMutation.isLoading}
            >
              Enviar e-mail de recuperação
            </Button>
            <Anchor component={Link} to="/login">
              Voltar para o login
            </Anchor>
          </Stack>
        </form>
      </Card>
    </Center>
  );
}
