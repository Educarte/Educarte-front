import { BaseQuery, PaginatedResponse } from '@/core/types';

export interface Classroom {
  id?: string;
  name: string;
  maxStudents: number;
  currentQuantityStudents: number;
  teachers: Teacher[];
  status: number;
  time: number;
  classroomType: number;
  students: Students[];
}

export interface ClassroomRequest {
  id?: string;
  name: string;
  maxStudents: number | null;
  status: number | null;
  time: number | null | string;
  classroomType: number | null | string;
  teacherIds: string[];
  employeesIds: string[];
  studentIds?: string[];
}

export interface ClassroomDetails {
  id: string;
  name: string;
  maxStudents: number;
  currentQuantityStudents: number;
  status: number;
  time: number;
  classroomType: number;
  teachers: Teacher[];
  students: Students[];
  diaries: Diaries[];
}

export type TeachersListResponse = PaginatedResponse<TeacherList>;

export type TeachersListRequestParams = BaseQuery & {
  profile?: number;
};

export type EmployeesListResponse = PaginatedResponse<EmployeesList>;

export type EmployeesListRequestParams = BaseQuery & {
  profile?: number;
};

export interface TeacherList {
  id: string;
  name: string;
}

export interface EmployeesList {
  id: string;
  name: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  legalGuardianType: string;
  profile: number;
  status: number;
}

export interface LegalGuardians {
  id?: string;
  name: string;
  email: string;
  cellphone: string;
  legalGuardianType: string;
  profile?: number;
  status?: number;
}

export interface ContractedHours {
  id: string;
  hours: number | null;
  status: number | null;
  startDate: Date | null;
  endDate: Date | null;
}

export interface Students {
  id: string;
  name: string;
  genre: number;
  bloodType: number;
  time: number;
  status: number;
  birthDate: Date;
  legalGuardians: LegalGuardians[];
  contractedHours: ContractedHours[];
}

export interface Diaries {
  id: string;
  name: string;
  fileUri: string;
  description: string;
  isDiaryForAll: boolean;
  diaryType: number;
  time: Date;
}

export type ListClassroomQuery = BaseQuery & {
  classroomType?: string | null;
  status?: number | string | null;
};

export type ListClassroomResponse = PaginatedResponse<Classroom>;
