import { getProdutoAPI } from '@/src/actions/produto';
import { useState, useCallback } from 'react';

export function useGetProduto() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [produto, setProduto] = useState<ProdutoType | null>(null);

  const execute = useCallback(async (id_produto: number) => {
    setLoading(true);
    try {
      const data = await getProdutoAPI({ id_produto });

      if (!data.success) throw new Error(data.error);

      setProduto(data.produto);
      setError(null);
      return {
        success: true
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao buscar detalhes do produto");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error, produto };
}