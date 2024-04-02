import {
  ClassroomDetails,
  Students,
} from '@/core/domain/classroom/classroom.types';

export type ClasroomStudentListProps = {
  student?: ClassroomDetails['students'];
  listStudents: string[];
  setListStudents: React.Dispatch<React.SetStateAction<string[]>>;
  setStudents?: React.Dispatch<React.SetStateAction<Students[] | undefined>>;
};
