import { TeacherList } from '@/core/domain/classroom/classroom.types';
import { MultiSelectProps } from '@mantine/core';

export type EmployeesSelectProps = Omit<MultiSelectProps, 'data'> & {
  employees?: TeacherList[];
};
