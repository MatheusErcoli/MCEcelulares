import { useState, useCallback } from 'react';
import { getPedidosAPI } from '@/src/actions/pedido';
import { useAuth } from '@/src/contexts/AuthContext';

export const useGetPedidos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pedidos, setPedidos] = useState<PedidoType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const { token } = useAuth();

  const execute = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const data = await getPedidosAPI(token!, { page });
      if (!data.success) throw new Error(data.error);
      setPedidos(data.pedidos ?? []);
      setTotalPages(data.totalPages ?? 1);
      setTotal(data.total ?? 0);
      setError(null);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao buscar pedidos');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading, error, pedidos, totalPages, total };
};