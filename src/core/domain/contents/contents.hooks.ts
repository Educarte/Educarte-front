import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { showNotification } from '@/core/utils';
import { ListContentsQuery, ListContentsResponse } from '.';
import contentsService from './contents.service';

const QUERY_KEY = 'contents';

export function useContents(params?: ListContentsQuery) {
  return useQuery<ListContentsResponse, AxiosError>(
    [QUERY_KEY, { ...params }],
    () => contentsService.list({ ...params }),
    {
      onError() {
        showNotification({
          variant: 'error',
          message: 'Erro ao listar os conteúdos',
        });
      },
    }
  );
}

export function useCreateContent() {
  const queryClient = useQueryClient();

  return useMutation(contentsService.create, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Conteúdo criado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao criar um conteúdo.',
      });
    },
  });
}

export function useEditContent() {
  const queryClient = useQueryClient();

  return useMutation(contentsService.edit, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Conteúdo atualizado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao atualizar um conteúdo.',
      });
    },
  });
}

export function useToggleContent() {
  const queryClient = useQueryClient();

  return useMutation(contentsService.toggle, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Situação atualizada com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao atualizar a situação.',
      });
    },
  });
}

export function useRemoveContent() {
  const queryClient = useQueryClient();

  return useMutation(contentsService.remove, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Conteúdo removido com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao remover o conteúdo.',
      });
    },
  });
}
