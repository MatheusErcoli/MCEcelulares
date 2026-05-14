import { createEnderecoAPI } from '@/src/actions/endereco';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

export const useCreateEndereco = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      const data = await createEnderecoAPI(token!, formData);

      if (!data.success) throw new Error(data.error);

      Swal.fire({
        icon: 'success',
        title: 'Endereço adicionado com sucesso!',
        text: 'Agora faça um pedido para usar este novo endereço.',
      });
      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar endereço',
        text: (error as Error).message || 'Não foi possível cadastrar endereço',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading };
};