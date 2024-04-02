import { AxiosError } from 'axios';
import { ListMenusQuery, ListMenusResponse } from './menu.types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import menuService from './menu.service';
import { showNotification } from '@/core/utils';

const QUERY_KEY = 'menus';

export function useMenus(params?: ListMenusQuery) {
  return useQuery<ListMenusResponse, AxiosError>(
    [QUERY_KEY, { ...params }],
    () => menuService.list({ ...params }),
    {
      onError() {
        showNotification({
          variant: 'error',
          message: 'Erro ao listar os cardápios',
        });
      },
    }
  );
}

export function useEditMenu() {
  const queryClient = useQueryClient();

  return useMutation(menuService.edit, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Cardápio editado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao editar o cardápio',
      });
    },
  });
}

export function useRemoveMenus() {
  const queryClient = useQueryClient();

  return useMutation(menuService.remove, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Cardápio removido com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao remover o cardápio',
      });
    },
  });
}

export function useCreateMenus() {
  const queryClient = useQueryClient();

  return useMutation(menuService.create, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Cardápio cadastrado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao cadastrar o cardápio',
      });
    },
  });
}

export function useToggleMenus() {
  const queryClient = useQueryClient();

  return useMutation(menuService.toggle, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Status do cardápio atualizado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao atualizar o status do cardápio',
      });
    },
  });
}
