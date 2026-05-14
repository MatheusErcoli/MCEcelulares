import { deleteMarcaAPI } from '@/src/actions/marca';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

export const useDeleteMarca = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(async (id_marca: number) => {
    const confirm = await Swal.fire({
      title: 'Excluir marca?',
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
      const data = await deleteMarcaAPI(token!, id_marca);

      if (!data.success) throw new Error(data.error);

      await Swal.fire({
        icon: 'success',
        title: 'Marca excluída com sucesso!',
        text: 'A marca foi removida do sistema.',
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao excluir marca',
        text: (error as Error).message || 'Não foi possível excluir a marca',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading };
};