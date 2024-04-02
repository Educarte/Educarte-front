import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  ClassroomListRequestParams,
  ClassroomListResponse,
  ListMessagesQuery,
  ListMessagesResponse,
  StudentsListRequestParams,
  StudentsListResponse,
} from './messages.types';
import { AxiosError } from 'axios';
import messagesService from './messages.service';
import { showNotification } from '@/core/utils';

const QUERY_KEY = 'diary';

export function useMessages(params?: ListMessagesQuery) {
  return useQuery<ListMessagesResponse, AxiosError>(
    [QUERY_KEY, { ...params }],
    () => messagesService.list({ ...params }),
    {
      onError() {
        showNotification({
          variant: 'error',
          message: 'Erro ao listar os recados',
        });
      },
    }
  );
}

export function useToggleMessages() {
  const queryClient = useQueryClient();

  return useMutation(messagesService.toggle, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Status do recado atualizado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao atualizar o status do recado',
      });
    },
  });
}

export function useEditMessages() {
  const queryClient = useQueryClient();

  return useMutation(messagesService.edit, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Recado editado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao editar o recado',
      });
    },
  });
}

export function useStudentsListInfinite(params?: StudentsListRequestParams) {
  return useInfiniteQuery<StudentsListResponse, AxiosError>(
    [[QUERY_KEY], 'infinity', params],
    ({ pageParam }) => {
      const queryParams: StudentsListRequestParams = {
        ...params,
        page: pageParam,
      };

      return messagesService.listStudents(queryParams);
    },
    {
      getNextPageParam: (req) => {
        if (!req || req.pagination.isLastPage) {
          return;
        }
        return req.pagination.page + 1;
      },
      onError() {
        showNotification({
          variant: 'error',
          message: 'Erro ao listar estudantes',
        });
      },
    }
  );
}

export function useClassroomListInfinite(params?: ClassroomListRequestParams) {
  return useInfiniteQuery<ClassroomListResponse, AxiosError>(
    [[QUERY_KEY], 'infinity', params],
    ({ pageParam }) => {
      const queryParams: ClassroomListRequestParams = {
        ...params,
        page: pageParam,
      };

      return messagesService.listClassroom(queryParams);
    },
    {
      getNextPageParam: (req) => {
        if (!req || req.pagination.isLastPage) {
          return;
        }
        return req.pagination.page + 1;
      },
      onError() {
        showNotification({
          variant: 'error',
          message: 'Erro ao listar as classes',
        });
      },
    }
  );
}

export function useCreateMessages() {
  const queryClient = useQueryClient();

  return useMutation(messagesService.create, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Recado cadastrado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao cadastrar o recado',
      });
    },
  });
}

export function useRemoveMessages() {
  const queryClient = useQueryClient();

  return useMutation(messagesService.remove, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Recado removido com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao remover o recado',
      });
    },
  });
}
