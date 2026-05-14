import { getMarcasAPI } from '@/src/actions/marca';
import { useState, useCallback } from 'react';

export function useGetMarcas() {
  const [marcas, setMarcas] = useState<MarcaType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const execute = useCallback(async (id_categoria?: number, ativo?: boolean) => {
    setLoading(true);
    try {
      const data = await getMarcasAPI({ id_categoria, ativo });
      if (!data.success) throw new Error(data.error);
      setMarcas(data.marcas);
      setError(null);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || "Erro ao buscar marcas");
      return { success: false };
    } finally {
      setLoading(false);
    }
}, []);

  return { execute, marcas, loading, error };
}