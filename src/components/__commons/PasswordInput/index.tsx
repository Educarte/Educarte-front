import { ChangePasswordRequest } from '@/core/domain/users';
import {
  Box,
  Progress,
  PasswordInput,
  Group,
  Text,
  Center,
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
  { re: /[0-9]/, label: 'Incluir numero' },
  { re: /[A-Z]/, label: 'Incluir uma letra maiúscula ' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Incluir um caracter especial' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}
export type Props = {
  form: UseFormReturnType<ChangePasswordRequest>;
};

const PasswordStrength: React.FC<Props> = ({ form }) => {
  const strength = getStrength(form.values.newPassword);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.newPassword)}
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

  return (
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
  );
};
export default PasswordStrength;
