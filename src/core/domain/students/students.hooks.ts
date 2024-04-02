import { AxiosError } from 'axios';
import {
  ListStudentsQuery,
  ListStudentsResponse,
  StudentsDetails,
} from './students.types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import studentsService from './students.service';
import { showNotification } from '@/core/utils';
import { useNavigate } from 'react-router-dom';

const QUERY_KEY = 'students';

export function useStudents(params?: ListStudentsQuery) {
  return useQuery<ListStudentsResponse, AxiosError>(
    [QUERY_KEY, { ...params }],
    () => studentsService.list({ ...params }),
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

export function useStudent(id?: string) {
  const navigate = useNavigate();

  return useQuery<StudentsDetails, AxiosError>(
    [[QUERY_KEY], id],
    () => studentsService.details(id),
    {
      enabled: id !== undefined,
      onError() {
        showNotification({
          variant: 'error',
          message:
            'O estudante que você está tentando acessar não foi encontrado',
        });
        navigate('/app/students');
      },
    }
  );
}

export function useEditStudent() {
  const queryClient = useQueryClient();

  return useMutation(studentsService.edit, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Estudante editado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao editar o estudante',
      });
    },
  });
}

export function useCreateStudents() {
  const queryClient = useQueryClient();

  return useMutation(studentsService.create, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Estudante cadastrado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao cadastrar o estudante',
      });
    },
  });
}

export function useCreateLegalGuardians() {
  const queryClient = useQueryClient();

  return useMutation(studentsService.createLegalGuardian, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Representante legal cadastrado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao cadastrar o Representante legal',
      });
    },
  });
}

export function useToggleStudents() {
  const queryClient = useQueryClient();

  return useMutation(studentsService.toggle, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Status do estudante atualizado com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao atualizar o status do estudante',
      });
    },
  });
}

export function useRemoveStudents() {
  const queryClient = useQueryClient();

  return useMutation(studentsService.remove, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY]);
      showNotification({
        variant: 'success',
        message: 'Estudante removido com sucesso.',
      });
    },
    onError() {
      showNotification({
        variant: 'error',
        message: 'Erro ao remover o estudante',
      });
    },
  });
}
