import {
  ActionIcon,
  CheckIcon,
  Divider,
  Grid,
  Group,
  Loader,
  Stack,
  TextInput,
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
interface Props {
  registerId?: string;
  data?: RegisterDetails;
}

export const activeSchema = Yup.object().shape({
  name: Yup.string().required('Campo Obrigatório'),
});

export function RegisterComponent({ data }: Props) {
  const editMutation = useEditRegister();

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
  async function changeAccess(time: string, date: Date, id: string) {
    const [hora, minutos]: number[] = time.split(':').map(Number);
    date.setHours(hora);
    date.setMinutes(minutos);
    console.log('Teste', hora, minutos, date);
    await editMutation.mutateAsync({
      time: dayjs(date).format('YYYY-MM-DDTHH:mm:ss[Z]'),
      id: id,
    });
  }

  useEffect(() => {
    setAccessOriginal(data?.accessControlsByDate);
  }, [data]);

  function setValueTime(time: string, index: number, type: number) {
    if (data?.accessControlsByDate) {
      const copyTeste = [...data?.accessControlsByDate];

      copyTeste[index].accessControls[type].time = time;
      setAccessOriginal(copyTeste);
    }
  }

  return (
    <>
      <form>
        <Grid>
          <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            <Stack>
              {data?.accessControlsByDate?.map((access, i) => {
                return (
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
                            ? String(accessOriginal[i].accessControls[0].time)
                                .length > 5
                              ? dayjs(
                                  accessOriginal[i].accessControls[0].time
                                ).format('HH:mm')
                              : String(accessOriginal[i].accessControls[0].time)
                            : ''
                        }
                        onChange={(e) => {
                          setEntry(access.accessControls[0].id);
                          setTime(e.target.value);
                          setValueTime(e.target.value, i, 0);
                        }}
                        label="Entrada"
                        placeholder="00h. 00min"
                        disabled={
                          editMutation.isLoading &&
                          entry === access.accessControls[0].id
                        }
                        rightSection={
                          <>
                            {editMutation.isLoading &&
                              entry === access.accessControls[0].id && (
                                <Loader size={'xs'} />
                              )}
                            {entry === access.accessControls[0].id &&
                              !editMutation.isLoading && (
                                <ActionIcon
                                  size={'xs'}
                                  color="primary"
                                  variant="transparent"
                                  onClick={() =>
                                    changeAccess(
                                      String(time),
                                      new Date(access.date || ''),
                                      String(access.accessControls[0].id)
                                    )
                                  }
                                >
                                  <CheckIcon />
                                </ActionIcon>
                              )}
                          </>
                        }
                      />

                      <InputMask
                        masktype={'hour'}
                        value={
                          accessOriginal
                            ? String(accessOriginal[i].accessControls[1].time)
                                .length > 5
                              ? dayjs(
                                  accessOriginal[i].accessControls[1].time
                                ).format('HH:mm')
                              : String(accessOriginal[i].accessControls[1].time)
                            : ''
                        }
                        onChange={(e) => {
                          setEntry(access.accessControls[1].id);
                          setTime(e.target.value);
                          setValueTime(e.target.value, i, 1);
                        }}
                        label="Saída"
                        placeholder="00h. 00min"
                        disabled={
                          editMutation.isLoading &&
                          entry === access.accessControls[1].id
                        }
                        rightSection={
                          <>
                            {editMutation.isLoading &&
                              entry === access.accessControls[1].id && (
                                <Loader size={'xs'} />
                              )}
                            {entry === access.accessControls[1].id &&
                              !editMutation.isLoading && (
                                <ActionIcon
                                  size={'xs'}
                                  color="primary"
                                  variant="light"
                                  onClick={() =>
                                    changeAccess(
                                      String(time),
                                      new Date(access.date || ''),
                                      String(access.accessControls[1].id)
                                    )
                                  }
                                >
                                  <CheckIcon />
                                </ActionIcon>
                              )}
                          </>
                        }
                      />
                      <TextInput
                        label="Carga Horária Contrada"
                        placeholder="8h"
                        value={`${access.contractedHour.hours} H`}
                        disabled
                      />
                      <TextInput
                        label="Resumo Diário"
                        placeholder="+00h. 00min"
                        value={
                          access.dailySummary === null
                            ? ''
                            : access.dailySummary.replace(/\.\d+/, '')
                        }
                        disabled
                      />
                    </Group>
                    <Divider />
                  </>
                );
              })}
            </Stack>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}
