import { ReactNode } from 'react';
import {
  ActionIcon,
  Container,
  Flex,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { RiArrowLeftLine } from 'react-icons/ri';

interface Props {
  title: string;
  description?: string;
  children: ReactNode | ReactNode[];
  rightSection?: ReactNode;
  backTo?: string;
}

export function PageContainer({
  title,
  description,
  children,
  rightSection,
  backTo,
}: Props) {
  return (
    <Container
      bg="white"
      w="100%"
      fluid
      styles={{ root: { borderRadius: 5, padding: '32px' } }}
    >
      <Stack gap="md">
        <Flex align="center" justify="space-between">
          {backTo ? (
            <Group gap="xs">
              <ActionIcon
                variant="transparent"
                color="black"
                component={Link}
                to={backTo}
              >
                <RiArrowLeftLine
                  color="white"
                  style={{ width: '80%', height: '80%' }}
                />
              </ActionIcon>
              <Title order={1} size={24}>
                {title}
              </Title>
            </Group>
          ) : (
            <div>
              <Title order={1} c="primary" size={24}>
                {title}
              </Title>
              <Text c="gray.8">{description}</Text>
            </div>
          )}

          {rightSection}
        </Flex>

        {children}
      </Stack>
    </Container>
  );
}
