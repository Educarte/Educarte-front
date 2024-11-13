import {
  Divider,
  Grid,
  Group,
  Stack,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import * as Yup from 'yup';
import {
  AccessControlsByDate,
  RegisterDetails,
} from '@/core/domain/register/register.types';
import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { useEditRegister } from '@/core/domain/register/register.hooks';
import { useEffect, useState } from 'react';
import { AccessControls } from '@/core/domain/students/students.types';
import { useForm } from '@mantine/form';
import InputMask from '@/components/__commons/InputMask';
import { showConfirm } from '@/core/utils';
import { RiEdit2Line } from 'react-icons/ri';
interface Props {
  registerId?: string;
  data?: RegisterDetails;
}

export const activeSchema = Yup.object().shape({
  name: Yup.string().required('Campo Obrigatório'),
});

export function RegisterComponent({ data }: Props) {
  const theme = useMantineTheme();

  const editMutation = useEditRegister();

  const [toggleConfirmModal, setToggleConfirmModal] = useState<boolean>(false);

  const [accessOriginal, setAccessOriginal] =
    useState<AccessControlsByDate[]>();
  const [entry, setEntry] = useState<string>();
  const [time, setTime] = useState<string>();

  const form = useForm<AccessControls>({
    initialValues: {
      accessControlType: '',
      time: '',
    },
  });

  async function changeAccess(time: string, date?: Date, id?: string) {
    if (!date || !id) {
      return;
    }

    const [hora, minutos]: number[] = time.split(':').map(Number);
    date.setHours(hora);
    date.setMinutes(minutos);
    await editMutation.mutateAsync({
      time: dayjs(date).format('YYYY-MM-DDTHH:mm:ss[Z]'),
      id: id,
    });
  }

  function showConfirmEditTime(fieldName: string, callback: () => void) {
    return showConfirm({
      title: `Alterar horário de ${fieldName}`,
      message: `Deseja realmente alterar o horário de ${fieldName}?`,
      icon: (
        <RiEdit2Line
          style={{
            color: theme.colors.primary[9],
            width: '10%',
            height: '10%',
          }}
        />
      ),
      confirmText: 'Alterar horário',
      onConfirm: callback,
    });
  }

  useEffect(() => {
    setAccessOriginal(data?.accessControlsByDate);
  }, [data]);

  function setValueTime(time: string, index: number, type: number) {
    if (data?.accessControlsByDate) {
      const accessControls = [...data?.accessControlsByDate];

      console.log('accessControls', accessControls);

      accessControls[index].accessControls[type].time = time;
      setAccessOriginal(accessControls);
    }
  }

  return (
    <>
      <form>
        <Grid>
          <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            <Stack>
              {data?.accessControlsByDate?.map((access, i) => (
                <>
                  <Group grow justify="space-between">
                    <DateInput
                      value={new Date(access.date || '')}
                      label="Data"
                      placeholder="00 / 00 / 0000"
                      valueFormat="DD/MM/YYYY"
                      disabled
                    />
                    <InputMask
                      masktype={'hour'}
                      {...form.getInputProps('timeEntry')}
                      value={
                        accessOriginal
                          ? String(accessOriginal[i]?.accessControls[0]?.time)
                              .length > 5
                            ? dayjs(
                                accessOriginal[i]?.accessControls[0]?.time
                              ).format('HH:mm')
                            : String(accessOriginal[i]?.accessControls[0]?.time)
                          : ''
                      }
                      onChange={(e) => {
                        setEntry(access?.accessControls[0]?.id);
                        setTime(e.target.value);
                        setValueTime(e.target.value, i, 0);
                        setToggleConfirmModal(true);
                      }}
                      label="Entrada"
                      placeholder="00h. 00min"
                      disabled={
                        editMutation.isLoading &&
                        entry === access?.accessControls[0]?.id
                      }
                      onBlur={() => {
                        if (!toggleConfirmModal) {
                          return;
                        }

                        showConfirmEditTime('entrada', () =>
                          changeAccess(
                            String(time),
                            new Date(access.date || ''),
                            String(access?.accessControls[0]?.id)
                          )
                        );

                        setToggleConfirmModal(false);
                      }}
                    />

                    <InputMask
                      masktype={'hour'}
                      value={
                        accessOriginal
                          ? String(accessOriginal[i]?.accessControls[1]?.time)
                              .length > 5
                            ? dayjs(
                                accessOriginal[i]?.accessControls[1]?.time
                              ).format('HH:mm')
                            : String(accessOriginal[i]?.accessControls[1]?.time)
                          : ''
                      }
                      onChange={(e) => {
                        setEntry(access?.accessControls[1]?.id);
                        setTime(e.target.value);
                        setValueTime(e.target.value, i, 1);
                        setToggleConfirmModal(true);
                      }}
                      label="Saída"
                      placeholder="00h. 00min"
                      disabled={
                        editMutation.isLoading &&
                        entry === access.accessControls[1]?.id
                      }
                      onBlur={() => {
                        if (!toggleConfirmModal) {
                          return;
                        }

                        showConfirmEditTime('saída', () =>
                          changeAccess(
                            String(time),
                            new Date(access?.date || ''),
                            String(access?.accessControls[1]?.id)
                          )
                        );

                        setToggleConfirmModal(false);
                      }}
                    />
                    <TextInput
                      label="Carga Horária Contrada"
                      placeholder="8h"
                      value={`${access?.contractedHour?.hours} H`}
                      disabled
                    />
                    <TextInput
                      label="Resumo Diário"
                      placeholder="+00h. 00min"
                      value={
                        access?.dailySummary === null
                          ? ''
                          : access.dailySummary.replace(/\.\d+/, '')
                      }
                      disabled
                    />
                  </Group>
                  <Divider />
                </>
              ))}
            </Stack>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}
