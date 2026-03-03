export interface PaginationMeta {
  pages: number;
}

export interface ApiResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
