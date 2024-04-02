import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { showNotification } from '@/core/utils';
import usersService from './users.service';
import {
  ListUsersQuery,
  ListUsersResponse,
  VerifyCodeQuery,
} from './users.types';
import { useNavigate } from 'react-router-dom';

const QUERY_KEY = 'users';

export function useUsers(params?: ListUsersQuery) {
  return useQuery<ListUsersResponse, AxiosError>(
    [QUERY_KEY, { ...params }],
    () => usersService.list({ ...params }),
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

export function useCreateUsers() {
  const queryClient = useQueryClient();

  return useMutation(usersService.create, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Usuário cadastrado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao cadastrar o usuário',
      });
    },
  });
}

export function useToggleUsers() {
  const queryClient = useQueryClient();

  return useMutation(usersService.toggle, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Status do usuário atualizado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao atualizar o status do usuário',
      });
    },
  });
}

export function useResetPassword() {
  const queryClient = useQueryClient();

  return useMutation(usersService.resetPassword, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'E-mail de verificação enviado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao enviar o e-mail de recuperação',
      });
    },
  });
}

export function useVerifyCode(params?: VerifyCodeQuery) {
  return useQuery<boolean, AxiosError>(
    ['verifyCode', { ...params }],
    () => usersService.verifyCode({ ...params }),
    {
      enabled: params?.code !== undefined,
      onSuccess() {
        return true;
      },
      onError() {
        showNotification({
          variant: 'error',
          message: 'Código inválido ou expirado',
        });
      },
    }
  );
}

export function useForgotPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(usersService.forgotPassword, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Senha alterada com sucesso.',
      });
      navigate('/login');
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao alterar a senha',
      });
    },
  });
}

export function useResetUserPassword() {
  const queryClient = useQueryClient();

  return useMutation(usersService.resetUserPassword, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Senha do usuário alterada com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao alterar a senha do usuário',
      });
    },
  });
}

export function useEditUser() {
  const queryClient = useQueryClient();

  return useMutation(usersService.edit, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Usuário editado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao editar o usuário',
      });
    },
  });
}

export function useRemoveUser() {
  const queryClient = useQueryClient();

  return useMutation(usersService.remove, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Usuário removido com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao remover o usuário',
      });
    },
  });
}

export function useChangePassword() {
  const queryClient = useQueryClient();

  return useMutation(usersService.changePassword, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Senha alterada com sucesso.',
      });
    },
    onError(error: AxiosError) {
      const message =
        error.response && error.response.status === 403
          ? 'A senha atual não é válida'
          : 'Erro ao alterar a senha';

      showNotification({
        variant: 'error',
        message,
      });
    },
  });
}
