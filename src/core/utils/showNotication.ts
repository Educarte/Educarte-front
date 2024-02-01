import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { ResponseError } from '../types';

interface Props {
  variant: 'success' | 'error';
  message?: string | null;
  errors?: AxiosError;
}

export function showNotification({ variant, message, errors }: Props) {
  const errorResponse = errors && errors.response ? errors.response : null;
  const errorData = errorResponse
    ? (errorResponse.data as ResponseError)
    : null;
  const errorMessage = errorData
    ? errorData.message || errorData.description
    : null;

  toast(message || errorMessage, {
    type: variant,
  });
}
