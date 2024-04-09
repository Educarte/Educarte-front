import { ClassroomList } from '@/core/domain/messages/messages.types';
import { MultiSelectProps } from '@mantine/core';

export type ClassroomsSelectProps = Omit<MultiSelectProps, 'data'> & {
  classroom?: ClassroomList[];
};
