import { updateProdutoAPI } from '@/src/actions/produto';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';
import Swal from 'sweetalert2';

export const useUpdateProduto = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(async (id_produto: number, formData: FormData) => {
    setLoading(true);
    try {
      const data = await updateProdutoAPI(token!, id_produto, formData);

      if (!data.success) throw new Error(data.error);

      Swal.fire({
        icon: 'success',
        title: 'Produto atualizado com sucesso!',
        text: 'As alterações já estão disponíveis no sistema.',
      });
      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao atualizar produto',
        text: (error as Error).message || 'Não foi possível atualizar o produto',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading };
};