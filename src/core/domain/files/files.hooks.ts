import { useMutation } from 'react-query';
import filesService from './files.service';
import { showNotification } from '@/core/utils';

export function useUpload() {
  return useMutation(filesService.upload, {
    onSuccess() {
      showNotification({
        variant: 'success',
        message: 'Documento carregado com sucesso',
      });
    },
    onError(error) {
      showNotification({
        variant: 'error',
        message: error as string,
      });
    },
  });
}
