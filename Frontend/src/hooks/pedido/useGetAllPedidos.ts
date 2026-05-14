import { getPedidosAPI } from '@/src/actions/pedido';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export function useGetAllPedidos() {
  const [pedidos, setPedidos] = useState<PedidoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const { token } = useAuth();

  const execute = useCallback(async (status?: string) => {
    setLoading(true);
    try {
      const primeira = await getPedidosAPI(token!, { page: 1, status });
      if (!primeira.success) throw new Error(primeira.error);

      const totalPaginas = primeira.totalPages ?? 1;
      const todos = [...(primeira.pedidos ?? [])];

      for (let page = 2; page <= totalPaginas; page++) {
        const data = await getPedidosAPI(token!, { page, status });
        if (!data.success) throw new Error(data.error);
        todos.push(...(data.pedidos ?? []));
      }

      setPedidos(todos);
      setTotal(primeira.total ?? 0);
      setTotalPages(totalPaginas);
      setError(null);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao buscar pedidos');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, pedidos, loading, error, total, totalPages };
}