import { getPedidosAPI } from '@/src/actions/pedido';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export function useGetPedidosAdm() {
  const [pedidos, setPedidos] = useState<PedidoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const { token } = useAuth();

  const execute = useCallback(async (page: number = 1, status?: string) => {
    setLoading(true);
    try {
      const data = await getPedidosAPI(token!, { page, status });

      if (!data.success) throw new Error(data.error);

      setPedidos(data.pedidos ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
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