import { updateCategoriaAPI } from '@/src/actions/categoria';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

export const useUpdateCategoria = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(async (id_categoria: number, formData: FormData) => {
    setLoading(true);
    try {
      const data = await updateCategoriaAPI(token!, id_categoria, formData);

      if (!data.success) throw new Error(data.error);

      Swal.fire({
        icon: 'success',
        title: 'Categoria atualizada com sucesso!',
        text: 'As alterações já estão disponíveis no sistema.',
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao atualizar categoria',
        text: (error as Error).message || 'Não foi possível atualizar a categoria',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading };
};