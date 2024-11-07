import { useMutation } from 'react-query';
import { showNotification } from '@/core/utils';

import { viaCepServices } from './viacep.service';

export function useViaCep() {
  return useMutation(viaCepServices.addressByCep, {
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao buscar CEP',
      });
    },
  });
}
