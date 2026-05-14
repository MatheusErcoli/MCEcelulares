import { getUsuarioAPI } from '@/src/actions/usuario';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export const useGetUsuario = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<UsuarioType | null>(null);
  const { token } = useAuth();

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      if (!token) throw new Error('Você deve fazer login para acessar sua conta');
      const data = await getUsuarioAPI(token);
      if (!data.success) throw new Error(data.error);
      setUsuario(data.usuario);
      setError(null);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao acessar conta');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading, error, usuario };
};