import { BaseQuery, PaginatedResponse } from '@/core/types';

export interface Messages {
  id: string;
  name: string;
  fileUri: string;
  description: string;
  isDiaryForAll: boolean;
  status: number;
  diaryType: number;
  time: Date;
  createdAt: Date;
  students: Students[];
  classrooms: Classrooms[];
}

export interface MessagesRequest {
  id?: string;
  name: string;
  description: string;
  fileUri: string;
  isDiaryForAll?: boolean;
  typeFor?: string;
  time?: Date;
  studentIds: string[];
  classroomIds: string[];
}

export type ListMessagesQuery = BaseQuery & {
  status?: number | string | null;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  dateRange?: Date[] | null;
  studentId?: string;
  name?: string;
  classroomId?: string;
};

export type ListMessagesResponse = PaginatedResponse<Messages>;
export type StudentsListResponse = PaginatedResponse<StudentsList>;
export type ClassroomListResponse = PaginatedResponse<ClassroomList>;

export interface Students {
  id: string;
  name: string;
  genre: number;
  bloodType: number;
  time: number;
  status: number;
}

export type StudentsListRequestParams = BaseQuery & {
  studentStatus?: boolean | number;
};

export type ClassroomListRequestParams = BaseQuery & {
  status?: boolean | number;
};

export interface StudentsList {
  id: string;
  name: string;
}

export interface ClassroomList {
  id: string;
  name: string;
}

export interface Classrooms {
  id: string;
  name: string;
  maxStudents: number;
  currentQuantityStudents: number;
  teacher: Teacher;
  status: number;
  time: number;
  classroomType: number;
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
