import { Grid, Select, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import * as Yup from 'yup';
import {
  ListRegisterQuery,
  Register,
  RegisterDetails,
} from '@/core/domain/register/register.types';
import InputMask from '@/components/__commons/InputMask';
import { RegisterComponent } from '../RegisterComponent';
import { useEffect } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import dayjs from 'dayjs';

interface Props {
  form: UseFormReturnType<Register>;
  registerId?: string;
  data?: RegisterDetails;
  params?: ListRegisterQuery;
}

export const activeSchema = Yup.object().shape({
  name: Yup.string().required('Campo Obrigatório'),
});

const iconStyle = {
  color: 'var(--mantine-color-primary-4)',
  fontSize: 25,
  cursor: 'pointer',
};

export function RegisterForm({ form, data, params, registerId }: Props) {
  useEffect(() => {
    form.setValues({
      student: {
        name: String(data?.student.name),
        time: String(data?.student.time),
      },
      classroom: {
        name: data?.classroom === null ? '' : String(data?.classroom.name),
      },
      legalGuardian: {
        email: String(data?.legalGuardian?.email),
        cellphone: String(data?.legalGuardian?.cellphone),
        name: String(data?.legalGuardian?.name),
        legalGuardianType: String(data?.legalGuardian?.legalGuardianType),
      },
    });
  }, [data]);
  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
          <Stack>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  {...form.getInputProps('student.name')}
                  label="Nome"
                  placeholder="Adicione o nome do (a) aluno (a)"
                  disabled
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  {...form.getInputProps('classroom.name')}
                  label="Sala"
                  placeholder="Nome da turma"
                  disabled
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  {...form.getInputProps('student.time')}
                  label="Turno"
                  rightSection={<RiArrowDropDownLine style={iconStyle} />}
                  disabled
                  data={[
                    {
                      label: 'Matutino',
                      value: '0',
                    },
                    {
                      label: 'Vespertino',
                      value: '1',
                    },
                    {
                      label: 'Integral',
                      value: '2',
                    },
                  ]}
                  placeholder="Vespertino"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  {...form.getInputProps('legalGuardian.name')}
                  label="1° Representante Legal"
                  placeholder="Adicione o nome do representante legal"
                  disabled
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  {...form.getInputProps('legalGuardian.legalGuardianType')}
                  label="Parentesco"
                  placeholder="Adicione o parentesco com o aluno"
                  disabled
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  {...form.getInputProps('legalGuardian.email')}
                  label="E-mail"
                  placeholder="Adicione o e-mail"
                  disabled
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <InputMask
                  masktype={'phoneNumber'}
                  {...form.getInputProps('legalGuardian.cellphone')}
                  label="Telefone"
                  placeholder="Adicione o telefone"
                  disabled
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Text>
                  Saldo acumulado no período de{' '}
                  {dayjs(params?.startDate).format('MM/YYYY')} até{' '}
                  {dayjs(params?.endDate).format('MM/YYYY')} é de{' '}
                  {data?.summary.replace(/\.\d+/, '')}
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <RegisterComponent registerId={registerId} data={data} />
              </Grid.Col>
            </Grid>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
}
