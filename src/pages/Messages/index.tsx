import { useState } from 'react';
import { Button, Center, Portal, Stack } from '@mantine/core';
import { PageContainer } from '@/components/__commons';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { MessagesFilters } from '@/components/Messages/Filters';
import { useMessages } from '@/core/domain/messages/messages.hooks';
import { MessagesList } from '@/components/Messages/List';
import {
  ListMessagesQuery,
  Messages,
} from '@/core/domain/messages/messages.types';
import { RiAddLine } from 'react-icons/ri';
import { MessagesModal } from '@/components/Messages/Modal';

export default function MessagesPage() {
  const [params, setParams] = useState<ListMessagesQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data, isLoading } = useMessages(debounced);
  const [selected, setSelected] = useState<Messages>();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Stack gap="md">
      <MessagesFilters onChange={setParams} />
      <PageContainer
        title="Recados"
        description="Gerencie todos os recados da plataforma"
        rightSection={
          <Button variant="filled" onClick={() => open()}>
            <Center>
              <RiAddLine style={{ marginRight: '0.5em' }} />
              Novo Recado
            </Center>
          </Button>
        }
      >
        <MessagesList
          data={data}
          loading={isLoading}
          onPaginate={(page) => setParams((params) => ({ ...params, page }))}
        />
      </PageContainer>
      <Portal>
        <MessagesModal
          messages={selected}
          opened={opened}
          onClose={() => {
            setSelected(undefined);
            close();
          }}
        />
      </Portal>
    </Stack>
  );
}
