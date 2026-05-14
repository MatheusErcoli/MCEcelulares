import { deleteEnderecoAPI } from '@/src/actions/endereco';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';
import Swal from 'sweetalert2';

export const useDeleteEndereco = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(async (id_endereco: number) => {
    const confirm = await Swal.fire({
      title: 'Remover endereço?',
      text: 'Esta ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ff5c8a',
    });

    if (!confirm.isConfirmed) return { success: false };

    setLoading(true);
    try {
      const data = await deleteEnderecoAPI(token!, { id_endereco });

      if (!data.success) throw new Error(data.error);

      await Swal.fire({
        icon: 'success',
        title: 'Endereço removido com sucesso!',
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao remover endereço',
        text: (error as Error).message || 'Não foi possível remover o endereço',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading };
};