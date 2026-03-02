export interface PaginationMeta {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
