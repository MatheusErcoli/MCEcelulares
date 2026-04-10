import { PaginacaoResponse } from "../types/paginacao";


export function fazerPaginacaoResponse<T>(
  page: number,
  limit: number,
  total: number,
  data: T[]
): PaginacaoResponse<T> {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data,
  };
}