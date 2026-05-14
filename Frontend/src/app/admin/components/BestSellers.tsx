'use client';

import { Icon } from '@/src/components/layout/Icon';
import { usePedidosAdm } from '@/src/contexts/PedidosAdmContext';

export const BestSellers = () => {
  const { pedidos, loading, error } = usePedidosAdm();

  const bestSellers = pedidos
    .flatMap(pedido => pedido.itens ?? [])
    .reduce((acc, item) => {
      const nome = item.nome_produto ?? `Produto #${item.id_item}`;
      acc[nome] = (acc[nome] ?? 0) + item.quantidade;
      return acc;
    }, {} as Record<string, number>);

  const ranking = Object.entries(bestSellers)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <section className="bg-gray-200 rounded-[32px] p-8 flex flex-col gap-5">
      <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
        <Icon name="faFire" className="text-purple-700" />
        Mais Vendidos
      </h2>

      {loading && (
        <p className="text-center font-medium text-gray-400 animate-pulse">
          Carregando produtos...
        </p>
      )}

      {error && (
        <p className="text-center font-medium text-red-600 animate-pulse">
          {error}
        </p>
      )}

      {!loading && !error && ranking.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
          <Icon name="faMobileScreen" />
          <p className="text-sm font-medium">Nenhuma compra encontrada.</p>
        </div>
      )}

      {!loading && !error && (
        <div className="flex flex-col gap-3">
          {ranking.map(([nome, qtd], i) => (
            <div key={nome} className="flex items-center justify-between bg-white rounded-2xl px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-white bg-linear-to-r from-[#5714d7] to-[#7929c8] w-6 h-6 rounded-full flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-sm font-semibold text-gray-800">{nome}</p>
              </div>
              <p className="text-xs text-gray-400">{qtd} vendas</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};