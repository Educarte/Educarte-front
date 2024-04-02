import { ListRegisterQuery, RegisterDetails } from './register.types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import registerService from './register.service';
import { showNotification } from '@/core/utils';

const QUERY_KEY = 'students';

export function useRegister(params?: ListRegisterQuery, id?: string) {
  return useQuery<RegisterDetails, AxiosError>(
    [QUERY_KEY, { ...params, id }],
    () => registerService.details({ ...params }, id),
    {
      onError() {
        showNotification({
          variant: 'error',
          message: 'Erro ao listar os colaboradores',
        });
      },
    }
  );
}

export function useEditRegister() {
  const queryClient = useQueryClient();

  return useMutation(registerService.edit, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Horario editado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao editar o Horario',
      });
    },
  });
}
