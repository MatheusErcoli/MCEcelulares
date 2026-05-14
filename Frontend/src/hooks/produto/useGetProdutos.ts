import { getProdutosAPI } from '@/src/actions/produto';
import { useState, useCallback } from 'react';

export function useGetProdutos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

const execute = useCallback(async (page?: number, id_categoria?: string, id_marca?: string, destaque?: boolean, ativo?: boolean) => {
    setLoading(true);
    try {
      const data = await getProdutosAPI({ page, id_categoria, id_marca, destaque, ativo });
      if (!data.success) throw new Error(data.error);
      setTotalPages(data.totalPages);
      setTotal(data.total);
      setProdutos(data.produtos);
      setError(null);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || "Erro ao buscar produtos");
      return { success: false };
    } finally {
      setLoading(false);
    }
}, []);

  return { execute, loading, error, produtos, totalPages, total };
}