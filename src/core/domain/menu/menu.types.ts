import { BaseQuery, PaginatedResponse } from '@/core/types';

export interface Menus {
  id: string;
  name: string;
  uri: string;
  status: number;
  startDate: Date;
  validUntil: Date;
}

export interface MenusRequest {
  id?: string;
  name: string;
  uri: string;
  startDate?: Date;
  validUntil?: Date;
}

export type ListMenusQuery = BaseQuery & {
  status?: number | string | null;
  startDate?: Date | string;
  endDate?: Date | string;
};

export type ListMenusResponse = PaginatedResponse<Menus>;
