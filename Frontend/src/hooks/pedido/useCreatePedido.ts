import { createPedidoAPI } from '@/src/actions/pedido';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';
import Swal from 'sweetalert2';

export const useCreatePedido = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(async (id_endereco: number) => {
    setLoading(true);
    try {
      const data = await createPedidoAPI(token!, { id_endereco });

      if (!data.success) throw new Error(data.error);

      Swal.fire({
        icon: 'success',
        title: 'Pedido realizado com sucesso!',
        text: 'Seu pedido foi confirmado e está sendo processado.',
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao realizar pedido',
        text: (error as Error).message || 'Não foi possível concluir o pedido',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading };
};