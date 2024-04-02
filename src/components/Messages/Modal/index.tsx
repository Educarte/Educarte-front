import {
  Button,
  CheckIcon,
  Divider,
  FileInput,
  Group,
  Modal,
  ModalProps,
  Radio,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import {
  Messages,
  MessagesRequest,
} from '@/core/domain/messages/messages.types';
import {
  useCreateMessages,
  useEditMessages,
} from '@/core/domain/messages/messages.hooks';
import { RiUpload2Line } from 'react-icons/ri';
import { useUpload } from '@/core/domain/files';
import StudentsSelect from '../StudentsSelect';
import ClassroomsSelect from '../ClassroomSelect';

type Props = ModalProps & {
  messages?: Messages;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Campo Obrigatório'),
  description: Yup.string().required('Campo Obrigatório'),
});

export function MessagesModal({ messages, ...props }: Props) {
  const createMutation = useCreateMessages();
  const editMutation = useEditMessages();
  const [uri, setUri] = useState<string | null | File>(null);

  const uploadMutation = useUpload();

  async function handleUpload(files: File) {
    if (files) {
      const result = await uploadMutation.mutateAsync(files);
      setUri(result.items[0].filePath);
    }
  }

  const form = useForm<MessagesRequest>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      classroomIds: [],
      description: '',
      fileUri: '',
      studentIds: [],
    },
  });

  async function handleSaveUser(values: MessagesRequest) {
    if (messages) {
      await editMutation.mutateAsync({
        ...values,
        id: messages.id,
      });
    } else {
      await createMutation.mutateAsync({
        ...values,
        isDiaryForAll: values.typeFor === 'school' ? true : false,
        fileUri: String(uri),
        time: new Date(),
      });
    }
    handleClose();
  }

  function handleClose() {
    form.reset();
    props.onClose();
  }

  useEffect(() => {
    if (messages) {
      setUri(messages.fileUri);
      form.setValues({
        name: messages?.name || '',
        typeFor: messages.isDiaryForAll ? 'school' : 'student',
        studentIds: messages.students.map((student) => {
          return student.id;
        }),
        classroomIds: messages.classrooms.map((classroom) => {
          return classroom.id;
        }),
        description: messages.description || '',
        fileUri: messages.fileUri,
      });
    }
  }, [messages]);

  return (
    <Modal
      {...props}
      title={messages ? 'Editar Recado' : 'Novo Recado'}
      centered
      onClose={handleClose}
      size={1300}
    >
      <form onSubmit={form.onSubmit((values) => handleSaveUser(values))}>
        <Stack gap="md">
          <TextInput
            {...form.getInputProps('name')}
            label="Nome"
            placeholder="Adicione o nome do recado"
            required
          />

          <Radio.Group
            label="Para"
            {...form.getInputProps('typeFor')}
            name="for"
          >
            <Group mt="xs">
              <Radio icon={CheckIcon} value="student" label="Aluno" />
              <Radio icon={CheckIcon} value="classroom" label="Turma" />
              <Radio icon={CheckIcon} value="school" label="Escola" />
            </Group>
          </Radio.Group>
          {form.values.typeFor === 'student' && (
            <StudentsSelect {...form.getInputProps('studentIds')} />
          )}
          {form.values.typeFor === 'classroom' && (
            <ClassroomsSelect {...form.getInputProps('classroomIds')} />
          )}

          <Textarea
            {...form.getInputProps('description')}
            label="Descrição"
            placeholder="Adicione a descrição da nota"
            required
            rows={6}
          />
          <FileInput
            label="Arquivo"
            placeholder="Adicione o arquivo em PDF"
            accept={'application/pdf'}
            onChange={(e) => {
              if (e) handleUpload(e);
            }}
            rightSection={<RiUpload2Line style={{ color: '#6d8eab' }} />}
            required
          />
          <Divider />
          <Group gap="sm" justify="flex-end">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={
                createMutation.isLoading ||
                editMutation.isLoading ||
                uploadMutation.isLoading
              }
            >
              Salvar
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
