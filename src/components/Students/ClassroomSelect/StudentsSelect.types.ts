import { ClassroomList } from '@/core/domain/messages/messages.types';
import { SelectProps } from '@mantine/core';

export type ClassroomSelectProps = Omit<SelectProps, 'data'> & {
  classroom?: ClassroomList[];
};
