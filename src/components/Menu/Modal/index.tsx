import {
  Button,
  Divider,
  FileInput,
  Grid,
  Group,
  Modal,
  ModalProps,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Menus, MenusRequest } from '@/core/domain/menu/menu.types';
import { DateInput } from '@mantine/dates';
import { RiCalendarLine, RiUpload2Line } from 'react-icons/ri';
import { useCreateMenus, useEditMenu } from '@/core/domain/menu/menu.hooks';
import { useUpload } from '@/core/domain/files';

type Props = ModalProps & {
  menus?: Menus;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Campo Obrigatório'),
  startDate: Yup.date().required('Campo Obrigatório'),
  validUntil: Yup.date().required('Campo Obrigatório'),
});

export function MenuModal({ menus, ...props }: Props) {
  const [uri, setUri] = useState<string | null>(null);
  const createMutation = useCreateMenus();
  const editMutation = useEditMenu();

  const uploadMutation = useUpload();

  async function handleUpload(files: File) {
    if (files) {
      const result = await uploadMutation.mutateAsync(files);
      setUri(result.items[0].filePath);
    }
  }

  const form = useForm<MenusRequest>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      uri: '',
      startDate: undefined,
      validUntil: undefined,
    },
  });

  async function handleSaveUser(values: MenusRequest) {
    if (menus) {
      await editMutation.mutateAsync({
        ...values,
        id: menus.id,
      });
    } else {
      await createMutation.mutateAsync({
        ...values,
        uri: String(uri),
      });
    }
    handleClose();
  }

  function handleClose() {
    form.reset();
    props.onClose();
  }

  useEffect(() => {
    if (menus) {
      form.setValues({
        name: menus?.name || '',
        startDate: new Date(menus.startDate) || undefined,
        validUntil: new Date(menus.validUntil) || undefined,
        uri: menus.uri,
      });
    }
  }, [menus]);

  return (
    <Modal
      {...props}
      title={menus ? 'Editar Cardápio' : 'Novo Cardápio'}
      centered
      onClose={handleClose}
    >
      <form onSubmit={form.onSubmit((values) => handleSaveUser(values))}>
        <Stack gap="md">
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                {...form.getInputProps('name')}
                label="Nome"
                placeholder="Adicione o nome do cardápio"
                required
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <DateInput
                {...form.getInputProps('startDate')}
                label="Data de Início"
                placeholder="00 / 00 / 0000"
                valueFormat="DD/MM/YYYY"
                rightSection={<RiCalendarLine style={{ color: '#6d8eab' }} />}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DateInput
                {...form.getInputProps('validUntil')}
                label="Data de Termino"
                valueFormat="DD/MM/YYYY"
                placeholder="00 / 00 / 0000"
                rightSection={<RiCalendarLine style={{ color: '#6d8eab' }} />}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <FileInput
                required
                placeholder="Adicione o arquivo em PDF"
                rightSection={<RiUpload2Line style={{ color: '#6d8eab' }} />}
                label="Arquivo"
                onChange={(e) => {
                  if (e) handleUpload(e);
                }}
              />
            </Grid.Col>
          </Grid>
          <Divider />
          <Group gap="sm" justify="flex-end">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={createMutation.isLoading || editMutation.isLoading}
            >
              Salvar
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
