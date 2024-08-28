import { ChangePasswordRequest } from '@/core/domain/users';
import {
  Box,
  Progress,
  PasswordInput,
  Group,
  Text,
  Center,
  Button,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { RiCheckFill, RiLock2Line } from 'react-icons/ri';

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text component="div" c={meets ? 'teal' : 'gray.4'} mt={5} size="sm">
      <Center inline>
        {meets ? (
          <RiCheckFill size="0.9rem" stroke={1.5} />
        ) : (
          <RiCheckFill size="0.9rem" stroke={1.5} />
        )}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[a-z]/, label: 'Incluir uma letra minúscula' },
  { re: /[0-9]/, label: 'Incluir número' },
  { re: /[A-Z]/, label: 'Incluir uma letra maiúscula' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Incluir um caracter especial' },
  // Regra para confirmar que as senhas são iguais somente quando ambas são preenchidas
  {
    re: (password: string, confirmPassword: string) =>
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword,
    label: 'A senha e a confirmação de senha devem ser iguais',
  },
];

function getStrength(password: string, confirmPassword: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (typeof requirement.re === 'function') {
      if (!requirement.re(password, confirmPassword)) {
        multiplier += 1;
      }
    } else if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export type Props = {
  form: UseFormReturnType<ChangePasswordRequest>;
  isLoading: boolean;
};

const PasswordStrength: React.FC<Props> = ({ form, isLoading }) => {
  const strength = getStrength(
    form.values.newPassword,
    form.values.confirmPassword
  );
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={
        typeof requirement.re === 'function'
          ? requirement.re(form.values.newPassword, form.values.confirmPassword)
          : requirement.re.test(form.values.newPassword)
      }
    />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: '0ms' } }}
        value={
          form.values.newPassword.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  const isSubmitDisabled =
    form.values.newPassword.length === 0 ||
    form.values.newPassword !== form.values.confirmPassword;

  return (
    <>
      <div>
        <PasswordInput
          label="Nova Senha"
          placeholder="********"
          leftSection={<RiLock2Line size={16} />}
          required
          {...form.getInputProps('newPassword')}
        />

        <PasswordInput
          withAsterisk
          label="Confirmar nova senha"
          placeholder="********"
          {...form.getInputProps('confirmPassword')}
          leftSection={<RiLock2Line size={16} />}
        />
        <Group gap={5} grow mt="xs" mb="md">
          {bars}
        </Group>

        <PasswordRequirement
          label="Ter pelo menos 8 caracteres"
          meets={form.values.newPassword.length > 8}
        />
        {checks}
      </div>
      <Button
        disabled={isSubmitDisabled || form.values.confirmPassword === ''}
        type="submit"
        loading={isLoading}
      >
        Alterar Senha
      </Button>
    </>
  );
};

export default PasswordStrength;
