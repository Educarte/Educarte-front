import { StudentsList } from '@/core/domain/messages/messages.types';
import { MultiSelectProps } from '@mantine/core';

export type StudentsSelectProps = Omit<MultiSelectProps, 'data'> & {
  students?: StudentsList[];
};
