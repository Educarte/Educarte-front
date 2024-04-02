import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  Classroom,
  EmployeesListRequestParams,
  EmployeesListResponse,
  ListClassroomQuery,
  ListClassroomResponse,
  TeachersListRequestParams,
  TeachersListResponse,
} from './classroom.types';
import { AxiosError } from 'axios';
import { showNotification } from '@/core/utils';
import classroomService from './classroom.service';
import { useNavigate } from 'react-router-dom';

const QUERY_KEY = 'classroom';

export function useClassrooms(params?: ListClassroomQuery) {
  return useQuery<ListClassroomResponse, AxiosError>(
    [QUERY_KEY, { ...params }],
    () => classroomService.list({ ...params }),
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

export function useTeachersListInfinite(params?: TeachersListRequestParams) {
  return useInfiniteQuery<TeachersListResponse, AxiosError>(
    [[QUERY_KEY], 'infinity', params],
    ({ pageParam }) => {
      const queryParams: TeachersListRequestParams = {
        ...params,
        page: pageParam,
        profile: 3,
      };

      return classroomService.listTeachers(queryParams);
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
          message: 'Erro ao listar professores',
        });
      },
    }
  );
}

export function useEmployeesListInfinite(params?: EmployeesListRequestParams) {
  return useInfiniteQuery<EmployeesListResponse, AxiosError>(
    [[QUERY_KEY], 'infinity', params],
    ({ pageParam }) => {
      const queryParams: EmployeesListRequestParams = {
        ...params,
        page: pageParam,
        profile: 2,
      };

      return classroomService.listEmployees(queryParams);
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
          message: 'Erro ao listar colaboradores',
        });
      },
    }
  );
}

export function useClassroom(id?: string) {
  const navigate = useNavigate();

  return useQuery<Classroom, AxiosError>(
    [[QUERY_KEY], id],
    () => classroomService.details(id),
    {
      enabled: id !== undefined,
      onError() {
        showNotification({
          variant: 'error',
          message: 'A turma que você está tentando acessar não foi encontrado',
        });
        navigate('/app/actives');
      },
    }
  );
}

export function useCreateClassroom() {
  const queryClient = useQueryClient();

  return useMutation(classroomService.create, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Turma criada com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao criar uma turma.',
      });
    },
  });
}

export function useEditClasses() {
  const queryClient = useQueryClient();

  return useMutation(classroomService.edit, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Turma editada com sucesso.',
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

export function useToggleClassroom() {
  const queryClient = useQueryClient();

  return useMutation(classroomService.toggle, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Status da turma atualizado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao atualizar o status da turma',
      });
    },
  });
}
