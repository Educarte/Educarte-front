import { TeacherList } from '@/core/domain/classroom/classroom.types';
import { MultiSelectProps } from '@mantine/core';

export type TeacherSelectProps = Omit<MultiSelectProps, 'data'> & {
  teachers?: TeacherList[];
};
