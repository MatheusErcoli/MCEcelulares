import { deleteProdutoAPI } from '@/src/actions/produto';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

export const useDeleteProduto = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(async (id_produto: number) => {
    const confirm = await Swal.fire({
      title: 'Excluir produto?',
      text: 'Esta ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ff5c8a',
    });

    if (!confirm.isConfirmed) return { success: false };

    setLoading(true);
    try {
      const data = await deleteProdutoAPI(token!, id_produto);

      if (!data.success) throw new Error(data.error);

      await Swal.fire({
        icon: 'success',
        title: 'Produto excluído com sucesso!',
        text: 'O produto foi removido do sistema.',
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao excluir produto',
        text: (error as Error).message || 'Não foi possível excluir o produto',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading };
};