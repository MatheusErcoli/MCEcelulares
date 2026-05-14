import { createCarrinhoAPI, createItemCarrinhoAPI } from '@/src/actions/carrinho';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export const useCreateItemCarrinho = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const execute = useCallback(async (id_produto: number) => {
    setLoading(true);
    try {
      const dataCarrinho = await createCarrinhoAPI(token!);

      if (!dataCarrinho.success || !dataCarrinho.id_carrinho) {
        throw new Error(dataCarrinho.error);
      }

      const dataItemCarrinho = await createItemCarrinhoAPI(token!, {
        id_carrinho: dataCarrinho.id_carrinho,
        id_produto,
      });

      if (!dataItemCarrinho.success) throw new Error(dataItemCarrinho.error);

      setError(null);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao adicionar item ao carrinho');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading, error };
};