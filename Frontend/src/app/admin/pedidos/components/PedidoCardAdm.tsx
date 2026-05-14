'use client';

import { useState } from 'react';
import { updatePedidoStatusAPI } from '@/src/actions/pedido';
import { useAuth } from '@/src/contexts/AuthContext';
import { Icon } from '@/src/components/layout/Icon';

const STATUS_OPTIONS = ['AGUARDANDO_PAGAMENTO', 'PAGO', 'ENVIADO', 'ENTREGUE', 'CANCELADO'] as const;
type StatusType = typeof STATUS_OPTIONS[number];

const STATUS_LABELS: Record<StatusType, string> = {
  AGUARDANDO_PAGAMENTO: 'Aguardando Pagamento',
  PAGO:      'Pago',
  ENVIADO:   'Enviado',
  ENTREGUE:  'Entregue',
  CANCELADO: 'Cancelado',
};

const STATUS_STYLES: Record<StatusType, string> = {
  AGUARDANDO_PAGAMENTO: 'bg-yellow-100 text-yellow-700',
  PAGO:      'bg-blue-100 text-blue-700',
  ENVIADO:   'bg-indigo-100 text-indigo-700',
  ENTREGUE:  'bg-green-100 text-green-700',
  CANCELADO: 'bg-red-100 text-red-700',
};

interface PedidoCardAdmProps {
  pedido: PedidoType;
  onStatusUpdated: () => void;
}

export const PedidoCardAdm = ({ pedido, onStatusUpdated }: PedidoCardAdmProps) => {
  const { token } = useAuth();
  const [updating, setUpdating] = useState(false);
  const [open, setOpen] = useState(false);
  const [localStatus, setLocalStatus] = useState<StatusType>(
    (pedido.status as StatusType) ?? 'AGUARDANDO_PAGAMENTO'
  );

  const styleClass = STATUS_STYLES[localStatus] ?? 'bg-gray-100 text-gray-700';

  const handleStatusChange = async (newStatus: StatusType) => {
    if (!token || newStatus === localStatus) return;

    const previous = localStatus;
    setLocalStatus(newStatus);
    setUpdating(true);

    const result = await updatePedidoStatusAPI(token, pedido.id_pedido, newStatus);

    setUpdating(false);

    if (!result.success) {
      setLocalStatus(previous);
      return;
    }

    onStatusUpdated();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-150 p-5 flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
            <Icon name="faBox" className="text-purple-600 text-sm" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Pedido #{pedido.id_pedido}</p>
            <p className="text-xs text-gray-400">
              {new Date(pedido.data).toLocaleDateString('pt-BR', {
                day: '2-digit', month: 'short', year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Status dropdown */}
        <div className="relative">
          <button
            disabled={updating}
            onClick={() => setOpen((v) => !v)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${styleClass} ${updating ? 'opacity-50' : 'hover:opacity-80'}`}
          >
            {updating ? 'Salvando...' : STATUS_LABELS[localStatus]}
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden min-w-[200px]">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setOpen(false); handleStatusChange(s); }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 transition-colors
                    ${s === localStatus ? 'text-purple-700 bg-purple-50' : 'text-gray-700'}`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cliente */}
      {pedido.usuario && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Icon name="faUser" className="text-gray-400 w-3" />
          <span>{pedido.usuario.nome ?? `Usuário #${pedido.id_usuario}`}</span>
          {pedido.usuario.email && (
            <span className="text-gray-400">— {pedido.usuario.email}</span>
          )}
        </div>
      )}

      {/* Endereço */}
      {pedido.endereco && (
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <Icon name="faLocationDot" className="text-purple-400 mt-0.5 w-3" />
          <span>
            {pedido.endereco.endereco}, {pedido.endereco.numero} —{' '}
            {pedido.endereco.cidade}/{pedido.endereco.estado}
          </span>
        </div>
      )}

      {/* Itens */}
      {pedido.itens?.length > 0 && (
        <div className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-1.5">
          {pedido.itens.map((item: ItemPedidoType) => (
            <div key={item.id_item} className="flex justify-between text-xs text-gray-600">
              <span>{item.quantidade}× {item.nome_produto}</span>
              <span className="font-medium">
                R$ {Number(item.preco_unitario).toFixed(2).replace('.', ',')}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between items-center border-t border-gray-100 pt-3">
        <span className="text-xs text-gray-400">{pedido.itens?.length ?? 0} item(s)</span>
        <span className="font-bold text-purple-700 text-sm">
          R$ {Number(pedido.valor_total).toFixed(2).replace('.', ',')}
        </span>
      </div>
    </div>
  );
};