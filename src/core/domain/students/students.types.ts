import { BaseQuery, PaginatedResponse } from '@/core/types';
import { Teacher } from '../classroom/classroom.types';

export interface Students {
  id: string;
  name: string;
  naturalness: string;
  healthProblem: string;
  allergicFood: string;
  allergicMedicine: string;
  epilepsy: boolean;
  allergicBugBite: string;
  specialChild: string;
  birthDate: Date;
  specialChildHasReport: boolean;
  genre: number;
  bloodType: number;
  time: number;
  status: number;
  classroom: Classroom;
  legalGuardians: LegalGuardians[];
  contractedHours: ContractedHours[];
  accessControls: AccessControls[];
}

export interface StudentsDetails {
  id: string;
  name: string;
  naturalness: string;
  healthProblem: string;
  allergicFood: string;
  allergicMedicine: string;
  epilepsy: boolean;
  allergicBugBite: string;
  specialChild: string;
  specialChildHasReport: boolean;
  profession: string;
  workplace: string;
  genre: number;
  bloodType: number;
  time: number;
  status: number;
  birthDate: Date;
  currentMenu: CurrentMenu;
  classroom: ClassroomDetails;
  legalGuardian?: LegalGuardians;
  accessControls: AccessControls[];
  diaries: Diaries[];
  contractedHours: ContractedHours[];
  emergencyContacts: EmergencyContacts[];
}

export interface CurrentMenu {
  id: string;
  name: string;
  uri: string;
  status: number;
  startDate: Date;
  validUntil: Date;
}

export interface AccessControls {
  id?: string;
  accessControlType: number | string;
  time: Date | string;
  timeEntry?: string | Date;
  timeExit?: string;
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

export interface ClassroomDetails {
  id: string;
  name: string;
  maxStudents: number;
  currentQuantityStudents: number;
  teachers: Teacher[];
  status: number;
  time: number;
  classroomType: number;
}

export interface StudentsRequest {
  id?: string;
  name?: string;
  naturalness?: string;
  healthProblem?: string;
  healthProblemToggle?: string;
  allergicFoodToggle?: string;
  allergicMedicineToggle?: string;
  allergicBugBiteToggle?: string;
  allergicFood?: string;
  allergicMedicine?: string;
  epilepsy?: boolean | string;
  birthDate?: Date;
  allergicBugBite?: string;
  specialChild?: string;
  specialChildHasReport?: boolean;
  genre?: number | string;
  bloodType?: number;
  time?: number;
  classroomId?: string | null;
  profession: string;
  workplace: string;
  contractedHoursValue: ContractedHours;
  contractedHours: ContractedHours[];
  emergencyContacts?: EmergencyContacts[];
  contact1?: EmergencyContacts;
  contact2?: EmergencyContacts;
  contact3?: EmergencyContacts;
  legalGuardian?: LegalGuardians;
  legalGuardiansValue: LegalGuardians;
}

export interface StudentsEditRequest {
  id?: string;
  name: string;
  naturalness: string;
  healthProblem: string;
  allergicFood: string;
  allergicMedicine: string;
  epilepsy: boolean | null | string;
  allergicBugBite: string;
  specialChild: string;
  specialChildHasReport: boolean | null;
  birthDate?: Date;
  genre: number | string;
  bloodType?: number;
  time: number;
  classroomId?: string;
  contractedHours: ContractedHours[];
  contractedHoursValue?: ContractedHours;
  emergencyContacts: EmergencyContacts[];
  contact1?: EmergencyContacts;
  contact2?: EmergencyContacts;
  contact3?: EmergencyContacts;
  healthProblemToggle?: string;
  allergicFoodToggle?: string;
  allergicMedicineToggle?: string;
  allergicBugBiteToggle?: string;
  legalGuardiansValue?: LegalGuardians;
  legalGuardian?: LegalGuardians;
}

export interface LegalGuardians {
  id?: string | null;
  name?: string;
  email?: string;
  cellphone?: string;
  legalGuardianType?: string;
  profession?: string;
  workplace?: string;
  address: {
    id?: string;
    name?: string;
    cep: string;
    street: string;
    number?: string;
    district?: string;
    complement?: string;
    reference?: string;
    telephone?: string;
  };
}

export interface LegalGuardiansRequest {
  id?: string;
  name: string;
  email: string;
  cellphone: string;
  legalGuardianType: string;
  address: {
    name: string;
    cep: string;
    street: string;
    number: string;
    district: string;
    complement: string;
    reference: string;
    telephone: string;
  };
}

export type ListStudentsQuery = BaseQuery & {
  studentStatus?: number | string | null;
  contractStatus?: number | string;
  classroomType?: number | string | null;
  legalGuardianId?: string;
  time?: number | string | null;
};

export type ListStudentsResponse = PaginatedResponse<Students>;

export interface EmergencyContacts {
  id?: string;
  name: string;
  telephone: string;
}

export interface Classroom {
  id: string;
  name: string;
  status: number;
  time: number;
  classroomType: number;
}

export interface ContractedHours {
  id?: string;
  hours: number | null;
  status?: number;
  startDate: Date | null;
  endDate: Date | null;
}
