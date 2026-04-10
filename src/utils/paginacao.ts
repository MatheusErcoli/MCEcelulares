type paginacaoQuery = {
    page?: string;
    limit?: string;
};

export function obterPaginacao(query: any) {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(Number(query.limit) || 20, 50);
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}