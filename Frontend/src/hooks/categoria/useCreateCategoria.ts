import { createCategoriaAPI } from '@/src/actions/categoria';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

export const useCreateCategoria = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      const data = await createCategoriaAPI(token!, formData);

      if (!data.success) throw new Error(data.error);

      Swal.fire({
        icon: 'success',
        title: 'Categoria cadastrada com sucesso!',
        text: 'A categoria já está disponível no sistema.',
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar categoria',
        text: (error as Error).message || 'Não foi possível cadastrar a categoria',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading };
};