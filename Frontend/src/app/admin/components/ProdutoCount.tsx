'use client';

import { useEffect } from 'react';
import { Icon } from '@/src/components/layout/Icon';
import { useGetProdutos } from '@/src/hooks/produto/useGetProdutos';

const ProdutoCount = () => {
  const { execute, total, loading, error } = useGetProdutos();

  useEffect(() => {
    execute(1);
  }, [execute]);

  return (
    <div className="bg-white rounded-[24px] p-6 flex flex-col gap-3 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Produtos</p>
        <span className="text-purple-700 bg-purple-100 p-2 rounded-xl">
          <Icon name="faMobileScreen" />
        </span>
      </div>

      {loading && (
        <p className="text-3xl font-bold text-gray-300 animate-pulse">...</p>
      )}

      {error && (
        <p className="text-sm font-semibold text-red-400">Erro ao carregar</p>
      )}

      {!loading && !error && (
        <p className="text-3xl font-bold text-gray-900">{total}</p>
      )}

      <p className="text-xs text-gray-400">Total cadastrado</p>
    </div>
  );
};

export default ProdutoCount;