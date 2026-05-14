export type PaginacaoResponse<T> = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: T[];
};
