import { deleteUsuarioAPI } from '@/src/actions/usuario';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

export const useDeleteUsuario = () => {
  const [loading, setLoading] = useState(false);
  const { token, logout } = useAuth();

  const execute = useCallback(async () => {
    const confirm = await Swal.fire({
      title: 'Excluir conta?',
      text: 'Esta ação não poderá ser desfeita. Todos os seus dados serão removidos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ff5c8a',
    });

    if (!confirm.isConfirmed) return { success: false };

    setLoading(true);
    try {
      if (!token) throw new Error('Você deve fazer login para excluir sua conta');
      const data = await deleteUsuarioAPI(token);
      if (!data.success) throw new Error(data.error);
      await Swal.fire({
        icon: 'success',
        title: 'Conta excluída com sucesso!',
        text: 'Seus dados foram removidos do sistema.',
      });
      logout();
      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao excluir conta',
        text: (error as Error).message || 'Não foi possível excluir a conta',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  return { execute, loading };
};