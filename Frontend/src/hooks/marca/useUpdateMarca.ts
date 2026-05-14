import { updateMarcaAPI } from '@/src/actions/marca';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

export const useUpdateMarca = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(async (id_marca: number, formData: FormData) => {
    setLoading(true);
    try {
      const data = await updateMarcaAPI(token!, id_marca, formData);

      if (!data.success) throw new Error(data.error);

      Swal.fire({
        icon: 'success',
        title: 'Marca atualizada com sucesso!',
        text: 'As alterações já estão disponíveis no sistema.',
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao atualizar marca',
        text: (error as Error).message || 'Não foi possível atualizar a marca',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading };
};