import { BaseQuery, PaginatedResponse, StatusType } from '@/core/types';

export interface Content {
  id: string;
  name: string;
  status: StatusType;
}

export type ListContentsQuery = BaseQuery;

export type ListContentsResponse = PaginatedResponse<Content>;

export interface ContentRequest {
  id?: string;
  name: string;
}
