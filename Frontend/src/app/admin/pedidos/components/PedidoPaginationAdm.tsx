'use client';

import { useState, useEffect } from 'react';
import { useGetPedidosAdm } from '@/src/hooks/pedido/useGetPedidosAdm';
import { Pagination } from '@/src/components/layout/Pagination';
import { PedidoCardAdm } from './PedidoCardAdm';
import { Icon } from '@/src/components/layout/Icon';

const STATUS_OPTIONS = [
  { value: '',                     label: 'Todos os status' },
  { value: 'AGUARDANDO_PAGAMENTO', label: 'Aguardando Pagamento' },
  { value: 'PAGO',                 label: 'Pago' },
  { value: 'ENVIADO',              label: 'Enviado' },
  { value: 'ENTREGUE',             label: 'Entregue' },
  { value: 'CANCELADO',            label: 'Cancelado' },
];

export const PedidoPaginationAdm = () => {
  const { execute, pedidos, loading, error, total, totalPages } = useGetPedidosAdm();
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => { execute(currentPage, statusFilter); }, [currentPage, statusFilter, execute]);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto pt-5 pb-5 px-10">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Pedidos</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {loading ? '...' : `${total} pedido(s) encontrado(s)`}
          </p>
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="
              appearance-none cursor-pointer
              bg-white border border-gray-200 hover:border-gray-300
              text-gray-700 text-sm font-medium
              pl-4 pr-9 py-2.5
              rounded-full shadow-sm
              outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400
              transition-all duration-150
            "
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      </div>

      {loading && (
        <p className="text-center font-medium text-gray-400 animate-pulse">
          Carregando pedidos...
        </p>
      )}

      {error && (
        <p className="text-center font-medium text-red-500">{error}</p>
      )}

      {!loading && !error && pedidos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
          <Icon name="faBox"/>
          <p className="text-sm font-medium">Nenhum pedido encontrado.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {pedidos.map((pedido) => (
          <PedidoCardAdm
            key={pedido.id_pedido}
            pedido={pedido}
            onStatusUpdated={() => execute(currentPage, statusFilter)}
          />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};