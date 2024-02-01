import { AuthRequest, useLogin } from '@/core/domain/auth';
import {
  Anchor,
  Button,
  Card,
  Center,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { RiLock2Line, RiMailLine } from 'react-icons/ri';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Campo Obrigatório')
    .email('Informe um e-mail válido'),
  password: Yup.string().required('Campo Obrigatório'),
});

export default function LoginPage() {
  const loginMutation = useLogin();

  const form = useForm<AuthRequest>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  async function handleLogin(values: AuthRequest) {
    await loginMutation.mutateAsync(values);
  }

  return (
    <Center h="100%">
      <Card withBorder w={400}>
        <Stack gap="md">
          <Title order={2}>Login</Title>
          <Text>Faça o login para acessar a plataforma</Text>
          <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
            <Stack gap="md">
              <TextInput
                label="E-mail"
                placeholder="exemplo@email.com"
                leftSection={<RiMailLine size={16} />}
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Senha"
                placeholder="********"
                leftSection={<RiLock2Line size={16} />}
                {...form.getInputProps('password')}
              />
              <Button fullWidth type="submit" loading={loginMutation.isLoading}>
                Login
              </Button>
            </Stack>
          </form>
          <Anchor component={Link} to="/forgot">
            Esqueci minha senha
          </Anchor>
          <Text>
            Ao acessar e utilizar a plataforma, você concorda com nossa{' '}
            <Anchor component={Link} to="/privacy">
              política de privacidade.
            </Anchor>
          </Text>
        </Stack>
      </Card>
    </Center>
  );
}
