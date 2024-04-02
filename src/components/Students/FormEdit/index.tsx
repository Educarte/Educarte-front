import {
  Divider,
  Grid,
  Group,
  NumberInput,
  Portal,
  Radio,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import * as Yup from 'yup';

import { RiArrowDropDownLine, RiCalendarLine } from 'react-icons/ri';
import {
  Students,
  StudentsDetails,
  StudentsEditRequest,
} from '@/core/domain/students/students.types';
import { DateInput } from '@mantine/dates';
import InputMask from '@/components/__commons/InputMask';
import { LegalGuardianModal } from '../Modal/LegalGuardian';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';

interface Props {
  form: UseFormReturnType<StudentsEditRequest>;
  activeId?: string;
  data?: StudentsDetails;
}

export const activeSchema = Yup.object().shape({
  name: Yup.string().required('Campo Obrigatório'),
  volume: Yup.string().required('Campo Obrigatório'),
  tara: Yup.string().required('Campo Obrigatório'),
  owner: Yup.string().required('Campo Obrigatório'),
  contentId: Yup.string().required('Campo Obrigatório'),
});

export function StudentsEditForm({ form, data }: Props) {
  const [selected, setSelected] = useState<Students>();
  const [opened, { open, close }] = useDisclosure(false);
  const iconStyle = {
    color: 'var(--mantine-color-primary-4)',
    fontSize: 25,
    cursor: 'pointer',
  };
  open;
  selected;

  useEffect(() => {
    if (data) {
      form.setValues({
        name: data.name,
        birthDate: new Date(data.birthDate || ''),
        naturalness: data.naturalness,
        genre: String(data.genre),
        legalGuardiansValue: {
          name: data.legalGuardian?.name,
          legalGuardianType: data.legalGuardian?.legalGuardianType,
          email: data.legalGuardian?.email,
          cellphone: data.legalGuardian?.cellphone,
          profession: data.legalGuardian?.profession,
          workplace: data.legalGuardian?.workplace,
          address: {
            cep: String(data.legalGuardian?.address?.cep),
            street: String(data.legalGuardian?.address?.street),
            number: data.legalGuardian?.address?.number,
            complement: data.legalGuardian?.address?.complement,
          },
        },
        contractedHoursValue: {
          hours: data.contractedHours[0].hours,
          startDate: new Date(data.contractedHours[0].startDate || ''),
          endDate:
            data.contractedHours[0].endDate === null
              ? null
              : new Date(data.contractedHours[0].endDate || ''),
        },

        allergicBugBiteToggle:
          data.allergicBugBite === 'false' ? 'false' : 'true',
        allergicFoodToggle: data.allergicFood === 'false' ? 'false' : 'true',
        healthProblemToggle: data.healthProblem === 'false' ? 'false' : 'true',
        allergicMedicineToggle:
          data.allergicMedicine === 'false' ? 'false' : 'true',
        specialChild: data.specialChild === 'false' ? 'false' : 'true',
        epilepsy: data.epilepsy === true ? 'true' : 'false',
        healthProblem: data.healthProblem === 'false' ? '' : data.healthProblem,
        allergicFood: data.allergicFood === 'false' ? '' : data.allergicFood,
        allergicBugBite:
          data.allergicBugBite === 'false' ? '' : data.allergicBugBite,
        allergicMedicine:
          data.allergicMedicine === 'false' ? '' : data.allergicMedicine,
      });

      if (data.emergencyContacts.length >= 1) {
        form.setFieldValue('contact1.name', data.emergencyContacts[0].name);
        form.setFieldValue(
          'contact1.telephone',
          data.emergencyContacts[0].telephone
        );
      }

      if (data.emergencyContacts.length >= 2) {
        form.setFieldValue('contact2.name', data.emergencyContacts[1].name);
        form.setFieldValue(
          'contact2.telephone',
          data.emergencyContacts[1].telephone
        );
      }

      if (data.emergencyContacts.length === 3) {
        form.setFieldValue('contact3.name', data.emergencyContacts[2].name);
        form.setFieldValue(
          'contact3.telephone',
          data.emergencyContacts[2].telephone
        );
      }

      if (data.emergencyContacts.length >= 1) {
        form.values.emergencyContacts = data.emergencyContacts;
      }
    }
  }, [data]);

  function updateEmergencyContact(
    name: string,
    telephone: string,
    id?: string
  ) {
    debugger;
    if (name && telephone !== '') {
      if (id === undefined) {
        form.values.emergencyContacts?.push({
          name: name,
          telephone: telephone,
        });
      } else {
        const emergencyContacts = data?.emergencyContacts;
        if (emergencyContacts) {
          const index = emergencyContacts.findIndex(
            (contact) => contact.id === id
          );
          if (index !== -1) {
            emergencyContacts[index] = { id, name, telephone };
            form.values.emergencyContacts = emergencyContacts;
          } else {
            console.error('Contact not found');
          }
        } else {
          console.error('Emergency contacts array not found');
        }
      }
    }
  }

  const checkCEP = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length == 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then((res) => res.json())
        .then((data) => {
          form.setFieldValue(
            'legalGuardiansValue.address.street',
            data.logradouro
          );
        });
    } else {
      form.setFieldValue('legalGuardiansValue.address.street', '');
    }
  };

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
          <Stack>
            <Text c="dimmed">Dados Gerais</Text>
            <Grid>
              <Grid.Col span={8}>
                <TextInput
                  {...form.getInputProps('name')}
                  label="Nome"
                  placeholder="Adicione o nome do (a) aluno (a)"
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <DateInput
                  {...form.getInputProps('birthDate')}
                  label="Data de Nascimento"
                  valueFormat="DD/MM/YYYY"
                  placeholder="00 / 00 / 0000"
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  {...form.getInputProps('naturalness')}
                  label="Naturalidade"
                  placeholder="Adicione a naturalidade do (a) aluno (a)"
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Select
                  {...form.getInputProps('genre')}
                  label="Sexo"
                  rightSection={<RiArrowDropDownLine style={iconStyle} />}
                  data={[
                    {
                      label: 'Masculino',
                      value: '0',
                    },
                    {
                      label: 'Feminino',
                      value: '1',
                    },
                  ]}
                  placeholder="Feminino"
                  required
                />
              </Grid.Col>
              <Grid.Col mt={'lg'} span={8}>
                <TextInput
                  {...form.getInputProps('legalGuardiansValue.name')}
                  label="Representanate Legal"
                  placeholder="Adicione o nome do  representante legal"
                  required
                />
              </Grid.Col>
              <Grid.Col mt={'lg'} span={4}>
                <TextInput
                  {...form.getInputProps(
                    'legalGuardiansValue.legalGuardianType'
                  )}
                  label="Parentesco"
                  placeholder="Adicione o parentesco com o aluno"
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  {...form.getInputProps('legalGuardiansValue.email')}
                  label="E-mail"
                  placeholder="Adicione o e-mail"
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <InputMask
                  masktype={'phoneNumber'}
                  {...form.getInputProps('legalGuardiansValue.cellphone')}
                  label="Telefone"
                  placeholder="Adicione o telefone"
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  {...form.getInputProps('legalGuardiansValue.profession')}
                  label="Profissão"
                  placeholder="Adicione a profissão"
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  {...form.getInputProps('legalGuardiansValue.workplace')}
                  label="Local de Trabalho"
                  placeholder="Adicione o local de trabalho"
                  required
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <InputMask
                  masktype={'cep'}
                  {...form.getInputProps('legalGuardiansValue.address.cep')}
                  label="CEP"
                  onBlur={checkCEP}
                  placeholder="00000-000"
                  required
                />
              </Grid.Col>
              <Grid.Col span={5}>
                <TextInput
                  {...form.getInputProps('legalGuardiansValue.address.street')}
                  label="Endereço Residencial"
                  placeholder="Rua Niterói, Centro, São Caetano do Sul, São Paulo"
                  required
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <TextInput
                  {...form.getInputProps('legalGuardiansValue.address.number')}
                  label="Número"
                  placeholder="Adicione o número"
                  required
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  {...form.getInputProps(
                    'legalGuardiansValue.address.complement'
                  )}
                  label="Complemento"
                  placeholder="Adicione o Complemento"
                />
              </Grid.Col>
              {/* <Grid.Col span={9}>
                  <Text c="dimmed">
                    O aluno pode ter até dois representantes com acesso ao
                    aplicativo. Deseja incluir um novo representante legal?
                  </Text>
                </Grid.Col>
                <Grid.Col ml={'4.4rem'} span={2}>
                  <Button onClick={() => open()} leftSection={<RiAddLine />}>
                    Representante Legal
                  </Button>
                </Grid.Col> */}

              <Grid.Col mt={'lg'} span={4}>
                <NumberInput
                  {...form.getInputProps('contractedHoursValue.hours')}
                  required
                  label="Horas Contratadas"
                  placeholder="Adicione as horas contratadas"
                />
              </Grid.Col>
              <Grid.Col mt={'lg'} span={4}>
                <DateInput
                  {...form.getInputProps('contractedHoursValue.startDate')}
                  required
                  label="Início"
                  placeholder="00 / 00 / 0000"
                  valueFormat="DD/MM/YYYY"
                  rightSection={
                    <RiCalendarLine
                      size={'1.1rem'}
                      style={{ color: '#547B9A' }}
                    />
                  }
                />
              </Grid.Col>
              <Grid.Col mt={'lg'} span={4}>
                <DateInput
                  {...form.getInputProps('contractedHoursValue.endDate')}
                  label="Termino"
                  placeholder="00 / 00 / 0000"
                  valueFormat="DD/MM/YYYY"
                  rightSection={
                    <RiCalendarLine
                      size={'1.1rem'}
                      style={{ color: '#547B9A' }}
                    />
                  }
                />
              </Grid.Col>
              {/* <Grid.Col span={9}>
                  <Text c="dimmed">
                    Para adicionar um novo contrato, é necessário definir a data
                    de término do contrato anterior. Deseja incluir um novo
                    contrato?
                  </Text>
                </Grid.Col>
                <Grid.Col ml={'2.7rem'} span={2}>
                  <Button leftSection={<RiAddLine />}>
                    Novo Contrato de Horas
                  </Button>
                </Grid.Col> */}
              <Grid.Col mt={'lg'} span={12}>
                <Text c="dimmed">
                  EM CASO DE EMERGÊNCIA, PARA QUEM LIGAR,{' '}
                  {<b>SE NÃO ENCONTRAR OS REPRESENTANTES LEGAIS?</b>}
                </Text>
              </Grid.Col>
              <Grid.Col span={8}>
                <TextInput
                  {...form.getInputProps('contact1.name')}
                  placeholder="Adicione o nome do contato de emergência"
                  onBlur={(e) =>
                    updateEmergencyContact(
                      e.target.value,
                      String(form.values.contact1?.telephone),
                      String(data?.emergencyContacts[0].id)
                    )
                  }
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <InputMask
                  {...form.getInputProps('contact1.telephone')}
                  placeholder="(00) 00000-0000"
                  masktype={'phoneNumber'}
                  onBlur={(e) =>
                    updateEmergencyContact(
                      String(form.values.contact1?.name),
                      e.target.value,
                      String(data?.emergencyContacts[0].id)
                    )
                  }
                />
              </Grid.Col>
              <Grid.Col span={8}>
                <TextInput
                  {...form.getInputProps('contact2.name')}
                  placeholder="Adicione o nome do contato de emergência"
                  onBlur={(e) =>
                    updateEmergencyContact(
                      e.target.value,
                      String(form.values.contact2?.telephone),
                      String(data?.emergencyContacts[1].id)
                    )
                  }
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <InputMask
                  {...form.getInputProps('contact2.telephone')}
                  placeholder="(00) 00000-0000"
                  masktype={'phoneNumber'}
                  onBlur={(e) =>
                    updateEmergencyContact(
                      String(form.values.contact2?.name),
                      e.target.value,
                      String(data?.emergencyContacts[1].id)
                    )
                  }
                />
              </Grid.Col>
              <Grid.Col span={8}>
                <TextInput
                  {...form.getInputProps('contact3.name')}
                  placeholder="Adicione o nome do contato de emergência"
                  onBlur={(e) =>
                    updateEmergencyContact(
                      e.target.value,
                      String(form.values.contact3?.telephone),
                      String(data?.emergencyContacts[2].id)
                    )
                  }
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <InputMask
                  {...form.getInputProps('contact3.telephone')}
                  placeholder="(00) 00000-0000"
                  masktype={'phoneNumber'}
                  onBlur={(e) =>
                    updateEmergencyContact(
                      String(form.values.contact3?.name),
                      e.target.value,
                      String(data?.emergencyContacts[2].id)
                    )
                  }
                />
              </Grid.Col>

              <Grid.Col span={10}>
                <Text>
                  A criança possui algum problema de saúde?{' '}
                  <b style={{ color: 'red' }}>*</b>
                </Text>
              </Grid.Col>

              <Radio.Group
                {...form.getInputProps('healthProblemToggle')}
                required
              >
                <Group mt="xs">
                  <Radio value="true" label="Sim" />
                  <Radio value="false" label="Não" />
                </Group>
              </Radio.Group>
              {form.values.healthProblemToggle === 'true' && (
                <Grid.Col span={12}>
                  <Textarea
                    {...form.getInputProps('healthProblem')}
                    placeholder="Se a resposta for sim, forneça mais informações."
                    w={'98%'}
                    rows={3}
                  />
                </Grid.Col>
              )}

              <Divider color="gray.4" w={'97%'} />
              <Grid.Col span={10}>
                <Text>
                  A criança é alérgica a algum alimento?{' '}
                  <b style={{ color: 'red' }}>*</b>
                </Text>
              </Grid.Col>
              <Radio.Group
                {...form.getInputProps('allergicFoodToggle')}
                required
              >
                <Group mt="xs">
                  <Radio value="true" label="Sim" />
                  <Radio value="false" label="Não" />
                </Group>
              </Radio.Group>
              {form.values.allergicFoodToggle === 'true' && (
                <Grid.Col span={12}>
                  <Textarea
                    {...form.getInputProps('allergicFood')}
                    placeholder="Se a resposta for sim, forneça mais informações."
                    w={'98%'}
                    rows={3}
                  />
                </Grid.Col>
              )}
              <Divider color="gray.4" w={'97%'} />

              <Grid.Col span={10}>
                <Text>
                  A criança é alérgica a algum medicamento?{' '}
                  <b style={{ color: 'red' }}>*</b>
                </Text>
              </Grid.Col>
              <Radio.Group
                {...form.getInputProps('allergicMedicineToggle')}
                required
              >
                <Group mt="xs">
                  <Radio value="true" label="Sim" />
                  <Radio value="false" label="Não" />
                </Group>
              </Radio.Group>
              {form.values.allergicMedicineToggle === 'true' && (
                <Grid.Col span={12}>
                  <Textarea
                    {...form.getInputProps('allergicMedicine')}
                    placeholder="Se a resposta for sim, forneça mais informações."
                    w={'98%'}
                    rows={3}
                  />
                </Grid.Col>
              )}
              <Divider color="gray.4" w={'97%'} />

              <Grid.Col span={10}>
                <Text>
                  A criança tem ou já teve crises de epilepsia?{' '}
                  <b style={{ color: 'red' }}>*</b>
                </Text>
              </Grid.Col>
              <Radio.Group {...form.getInputProps('epilepsy')} required>
                <Group mt="xs">
                  <Radio value="true" label="Sim" />
                  <Radio value="false" label="Não" />
                </Group>
              </Radio.Group>

              <Divider color="gray.4" w={'97%'} />

              <Grid.Col span={10}>
                <Text>
                  A criança é alérgica a picada de algum inseto?{' '}
                  <b style={{ color: 'red' }}>*</b>
                </Text>
              </Grid.Col>
              <Radio.Group
                {...form.getInputProps('allergicBugBiteToggle')}
                required
              >
                <Group mt="xs">
                  <Radio value="true" label="Sim" />
                  <Radio value="false" label="Não" />
                </Group>
              </Radio.Group>
              {form.values.allergicBugBiteToggle === 'true' && (
                <Grid.Col span={12}>
                  <Textarea
                    {...form.getInputProps('allergicBugBite')}
                    placeholder="Se a resposta for sim, forneça mais informações."
                    w={'98%'}
                    rows={3}
                  />
                </Grid.Col>
              )}
              <Divider color="gray.4" w={'97%'} />
              <Grid.Col span={10}>
                <Text>
                  A criança é autista? <b style={{ color: 'red' }}>*</b>
                </Text>
              </Grid.Col>
              <Radio.Group {...form.getInputProps('specialChild')} required>
                <Group mt="xs">
                  <Radio value="true" label="Sim" />
                  <Radio value="false" label="Não" />
                </Group>
              </Radio.Group>
              <Divider color="gray.4" w={'97%'} />
            </Grid>
          </Stack>
        </Grid.Col>
      </Grid>

      <Portal>
        <LegalGuardianModal
          opened={opened}
          onClose={() => {
            setSelected(undefined);
            close();
          }}
        />
      </Portal>
    </>
  );
}
