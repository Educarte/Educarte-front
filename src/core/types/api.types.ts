export interface PaginatedResponse<T> {
  pagination: {
    page: number;
    pageSize: number;
    field: string;
    sortDirection: 0 | 1;
    total: number;
    pageCount: number;
    isFirstPage: boolean;
    isLastPage: boolean;
  };
  items: T[];
}

export interface BaseQuery {
  search?: string;
  page?: number;
  pageSize?: number;
  field?: string;
  isActive?: boolean | string | null;
  sortDirection?: 0 | 1;
  hasSortingData?: boolean;
}

export interface ResponseError {
  name: string;
  fieldErrors: Record<string, string[]>;
  message?: string | null;
  description?: string;
}

export type StatusType = 0 | 1;
