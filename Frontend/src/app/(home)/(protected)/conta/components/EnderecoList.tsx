'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@/src/components/layout/Icon';
import { useGetEnderecos } from '@/src/hooks/endereco/useGetEnderecos';
import { useDeleteEndereco } from '@/src/hooks/endereco/useDeleteEndereco';
import { Button } from '@/src/components/layout/Button';

export const EnderecoList = () => {
  const { execute: fetchEndereco, loading: loadingEndereco, enderecos } = useGetEnderecos();
  const { execute: deleteEndereco, loading: removendo } = useDeleteEndereco();

  useEffect(() => { fetchEndereco(); }, [fetchEndereco]);

  const handleDelete = async (id_endereco: number) => {
    const result = await deleteEndereco(id_endereco);
    if (result.success) fetchEndereco();
  };

  if (loadingEndereco) {
    return (
      <div className="bg-white rounded-[30px] p-6">
        <p className="text-gray-400 animate-pulse text-sm">Carregando endereços...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Icon name="faLocationDot" className="text-purple-700" />
          Meus endereços
        </h3>
        <Link href="/conta/endereco">
          <Button
            text="Novo"
            icon="faPlus"
            className="flex items-center gap-1 text-purple-700 text-sm font-semibold hover:opacity-75 transition-opacity"
          />
        </Link>
      </div>

      {enderecos.length === 0 ? (
        <div className="bg-white rounded-[24px] p-4 border-2 border-dashed border-gray-200 text-center">
          <p className="text-gray-400 text-sm">Nenhum endereço cadastrado.</p>
          <Link href="/conta/endereco" className="text-purple-700 text-sm font-semibold hover:underline">
            Adicionar endereço
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {enderecos.map((e) => (
            <div
              key={e.id_endereco}
              className="w-full flex items-center justify-between gap-3 p-4 rounded-[20px] border-2 border-gray-300 bg-gray-50"
            >
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

              <Button
                icon="faTrash"
                className="text-[#ff5c8a] hover:opacity-75 transition-opacity disabled:opacity-50"
                onClick={() => handleDelete(e.id_endereco)}
                disabled={removendo}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};