import { getCarrinhoAPI } from '@/src/actions/carrinho';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export const useGetCarrinho = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carrinho, setCarrinho] = useState<ItemCarrinhoType[]>([]);
  const { token } = useAuth();

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCarrinhoAPI(token!);

      if (!data.success) throw new Error(data.error);
      setCarrinho(data.carrinho?.itens ?? []);

      setError(null);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao buscar carrinho');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading, error, carrinho };
};