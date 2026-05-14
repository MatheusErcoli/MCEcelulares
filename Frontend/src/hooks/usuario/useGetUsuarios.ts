import { getUsuariosAPI } from '@/src/actions/usuario';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export function useGetUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const { token } = useAuth();

  const execute = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      if (!token) throw new Error('Você deve fazer login para acessar esta página');
      const data = await getUsuariosAPI(token, page);
      if (!data.success) throw new Error(data.error);
      setUsuarios(data.usuarios);
      setTotalPages(data.totalPages);
      setTotal(data.total);
      setError(null);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao buscar usuários');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, usuarios, loading, error, totalPages, total };
}