import axiosInstance from '@/core/configs/axios';
import { UploadResponse } from './files.types';

const URL_CONTROLLER = `/Files`;

export default {
  async upload(file: File): Promise<UploadResponse> {
    const formData = new FormData();

    formData.append('file', file, file.name);

    const result = await axiosInstance.post<UploadResponse>(
      `${URL_CONTROLLER}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return result?.data;
  },
};
