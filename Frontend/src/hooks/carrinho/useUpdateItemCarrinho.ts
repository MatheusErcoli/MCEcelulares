import { updateItemCarrinhoAPI } from '@/src/actions/carrinho';
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

export const useUpdateItemCarrinho = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const execute = useCallback(async (id_item_carrinho: number, quantidade: number) => {
    setLoading(true);
    try {
      const data = await updateItemCarrinhoAPI(token!, { id_item_carrinho, quantidade });

      if (!data.success) throw new Error(data.error);

      setError(null);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao alterar item do carrinho');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading, error };
};