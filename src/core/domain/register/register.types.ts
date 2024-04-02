import { BaseQuery } from '@/core/types';
import { ContractedHours, LegalGuardians } from '../classroom/classroom.types';
import { AccessControls } from '../students/students.types';

export interface Register {
  student: Student;
  classroom?: Classroom;
  accessControlsByDate?: AccessControlsByDate[];
  legalGuardian?: LegalGuardians;
  summary: string;
}

export interface RegisterDetails {
  student: Student;
  classroom: Classroom;
  accessControlsByDate?: AccessControlsByDate[];
  legalGuardian: LegalGuardians;
  summary: string;
}

export interface Classroom {
  id?: string;
  name?: string;
  status?: number;
  time?: number;
  classroomType?: number;
}

export interface Student {
  id?: string;
  name: string;
  genre?: number | null;
  bloodType?: number | string;
  time: number | null | string;
  status?: number | null;
  birthDate?: Date | null;
}

export type ListRegisterQuery = BaseQuery & {
  startDate?: Date | string | null;
  endDate?: Date | string | null;
};

export interface AccessControlsByDate {
  date: Date | null;
  accessControls: AccessControls[];
  contractedHour: ContractedHours;
  dailySummary: string;
}

export interface RegisterRequest {
  id?: string;
  time: Date | string;
}
