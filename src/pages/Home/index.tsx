import { Link } from 'react-router-dom';
import { Anchor, Center, Stack, Text, Title } from '@mantine/core';

export default function HomePage() {
  return (
    <Center h="100%">
      <Stack gap="md">
        <Title order={2}>Bem vindo ao {import.meta.env.VITE_APP_TITLE}</Title>
        <Text>{import.meta.env.VITE_APP_DESCRIPTION}</Text>

        <Anchor component={Link} to="/login">
          Ir para o login
        </Anchor>
      </Stack>
    </Center>
  );
}
