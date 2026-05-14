'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/src/components/layout/Icon';
import { useGetEnderecos } from '@/src/hooks/endereco/useGetEnderecos';
import { useGetCarrinho } from '@/src/hooks/carrinho/useGetCarrinho';
import { SubtotalCard } from '@/src/components/produtos/SubtotalCard';
import { useCreatePedido } from '@/src/hooks/pedido/useCreatePedido';
import { Button } from '@/src/components/layout/Button';

export const EnderecoSelector = () => {
  const router = useRouter();
  const { execute: fetchEndereco, loading: loadingEndereco, enderecos } = useGetEnderecos();
  const { execute: fetchCarrinho, carrinho } = useGetCarrinho();
  const { execute: createPedido, loading: loadingPedido } = useCreatePedido();

  useEffect(() => { fetchEndereco(); }, [fetchEndereco]);
  useEffect(() => { fetchCarrinho(); }, [fetchCarrinho]);

  const handleClick = async (id_endereco: number) => {
    const result = await createPedido(id_endereco);
    if (result?.success) router.push('/pedidos');
  };

  if (loadingEndereco) {
    return (
      <div className="bg-white rounded-[30px] p-6">
        <p className="text-gray-400 animate-pulse text-sm">Carregando endereços...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      <div className="lg:col-span-2 flex flex-col gap-3 bg-white p-6 rounded-[30px] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Icon name="faLocationDot" className="text-purple-700" />
              Escolha o endereço de entrega
            </h3>
            <p className="text-xs text-gray-400 pl-5">O pedido será confirmado ao clicar no endereço</p>
          </div>
          <Link href="/conta/endereco">
            <Button
              text="Novo"
              icon="faPlus"
              className="flex items-center gap-1 text-purple-700 text-sm font-semibold hover:opacity-75 transition-opacity"
            />
          </Link>
        </div>

        {enderecos.length === 0 ? (
          <div className="rounded-[24px] p-4 border-2 border-dashed border-gray-200 text-center">
            <p className="text-gray-400 text-sm">Nenhum endereço cadastrado.</p>
            <Link href="/conta/endereco" className="text-purple-700 text-sm font-semibold hover:underline">
              Adicionar endereço
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {enderecos.map((e) => (
              <button
                key={e.id_endereco}
                onClick={() => handleClick(e.id_endereco)}
                disabled={loadingPedido}
                className={`w-full text-left flex items-center gap-3 p-4 rounded-[20px] border-2 transition-all duration-100
                  border-gray-300 bg-gray-50 hover:bg-purple-50 hover:border-purple-400 hover:shadow-sm
                  ${loadingPedido ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <Icon name="faLocationDot" className="text-purple-400 text-lg shrink-0" />
                <div className="flex flex-col gap-0.5 flex-1">
                  <p className="font-semibold text-gray-900 text-sm">
                    {e.endereco}, {e.numero}
                    {e.complemento && ` — ${e.complemento}`}
                  </p>
                  {e.bairro && <p className="text-xs text-gray-500">{e.bairro}</p>}
                  <p className="text-xs text-gray-500">
                    {e.cidade} — {e.estado} — CEP: {e.cep}
                  </p>
                </div>
                <Icon name="faChevronRight" className="text-purple-300 text-sm shrink-0" />
                {loadingPedido && (
                  <p className="text-xs text-purple-600 font-semibold animate-pulse">
                    Finalizando...
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <SubtotalCard carrinho={carrinho} />
      </div>

    </div>
  );
};