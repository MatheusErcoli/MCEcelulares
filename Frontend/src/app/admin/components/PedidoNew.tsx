'use client';

import { Icon } from '@/src/components/layout/Icon';
import { usePedidosAdm } from '@/src/contexts/PedidosAdmContext';

const STATUS_LABELS: Record<string, string> = {
  AGUARDANDO_PAGAMENTO: 'Aguardando Pagamento',
  PAGO: 'Pago',
  ENVIADO: 'Enviado',
  ENTREGUE: 'Entregue',
  CANCELADO: 'Cancelado',
};

export const PedidoNew = () => {
  const { pedidos, loading, error } = usePedidosAdm();

  const recentes = pedidos.slice(0, 4);

  return (
    <section className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <Icon name="faBox" className="text-purple-700" />
          Pedidos Recentes
        </h2>
        <a
          href="/admin/pedidos"
          className="text-xs font-semibold text-purple-700 hover:opacity-75 transition-opacity"
        >
          Ver todos
        </a>
      </div>

      {loading && (
        <p className="text-center font-medium text-gray-400 animate-pulse">
          Carregando pedidos...
        </p>
      )}

      {error && (
        <p className="text-center font-medium text-red-600 animate-pulse">
          {error}
        </p>
      )}

      {!loading && !error && recentes.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
          <Icon name="faBox" />
          <p className="text-sm font-medium">Nenhum pedido encontrado.</p>
        </div>
      )}

      {!loading && !error && (
        <div>
          {recentes.map((pedido) => (
            <div
              key={pedido.id_pedido}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-900">
                  Pedido #{pedido.id_pedido}
                </p>
                <p className="text-xs text-gray-400">
                  {pedido.usuario?.nome} • {new Date(pedido.data).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                  {STATUS_LABELS[pedido.status] ?? pedido.status}
                </span>
                <p className="text-sm font-bold text-purple-700">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(pedido.valor_total))}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};