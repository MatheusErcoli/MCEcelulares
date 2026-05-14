import { createMarcaAPI } from '@/src/actions/marca';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

export const useCreateMarca = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      const data = await createMarcaAPI(token!, formData);

      if (!data.success) throw new Error(data.error);

      Swal.fire({
        icon: 'success',
        title: 'Marca cadastrada com sucesso!',
        text: 'A marca já está disponível no sistema.',
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar marca',
        text: (error as Error).message || 'Não foi possível cadastrar a marca',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading };
};