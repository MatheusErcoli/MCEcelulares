'use client';

import { Icon } from '@/src/components/layout/Icon';
import { usePedidosAdm } from '@/src/contexts/PedidosAdmContext';

const STATUS_PAGOS = ['PAGO', 'ENVIADO', 'ENTREGUE'];

const Revenue = () => {
    const { pedidos, loading, error } = usePedidosAdm();

    const receita = pedidos
        .filter(pedido => STATUS_PAGOS.includes(pedido.status))
        .reduce((acc, pedido) => acc + Number(pedido.valor_total), 0);

    return (
        <div className="bg-white rounded-[24px] p-6 flex flex-col gap-3 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Receita</p>
                <span className="text-purple-700 bg-purple-100 p-2 rounded-xl">
                    <Icon name="faDollarSign" />
                </span>
            </div>

            {loading && (
                <p className="text-3xl font-bold text-gray-300 animate-pulse">...</p>
            )}

            {error && (
                <p className="text-sm font-semibold text-red-400">Erro ao carregar</p>
            )}

            {!loading && !error && (
                <p className="text-3xl font-bold text-gray-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(receita)}
                </p>
            )}

            <p className="text-xs text-gray-400">Pedidos pagos, enviados e entregues</p>
        </div>
    );
};

export default Revenue;