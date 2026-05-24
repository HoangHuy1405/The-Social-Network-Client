type PaginationMeta = {
  page: number;
  pageSize: number;
  pages: number;
  total: number;
};

type PaginatedResponse<T> = {
  meta: PaginationMeta;
  result: T[];
};

type PaginationParams = {
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'ASC' | 'DESC';
};

export type { PaginationMeta, PaginatedResponse, PaginationParams };
