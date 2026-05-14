'use client';

import { useEffect, useState } from 'react';
import { useGetUsuario } from '@/src/hooks/usuario/useGetUsuario';
import { useUpdateUsuario } from '@/src/hooks/usuario/useUpdateUsuario';
import { useAuth } from '@/src/contexts/AuthContext';
import { EnderecoList } from './EnderecoList';
import { Icon } from '@/src/components/layout/Icon';
import { Button } from '@/src/components/layout/Button';
import { Input } from '@/src/components/layout/Input';
import { useDeleteUsuario } from '@/src/hooks/usuario/useDeleteUsuario';

export const ProfilePage = () => {
  const { execute: fetchUsuario, usuario, loading } = useGetUsuario();
  const { execute: updateUsuario, loading: atualizando } = useUpdateUsuario();
  const { execute: deleteUsuario, loading: excluindo } = useDeleteUsuario();
  const { updateNome } = useAuth();

  const [editando, setEditando] = useState(false);

  useEffect(() => { fetchUsuario(); }, [fetchUsuario]);

  const handleSubmit = async (formData: FormData) => {
    const result = await updateUsuario(formData);

    if (result?.success) {
      updateNome(result.nome!);
      setEditando(false);
      fetchUsuario();
    }
  };

  return (
    <main className="min-h-screen md:p-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">

        <h1 className="text-4xl font-bold">Meu Perfil</h1>

        <section className="bg-gray-200 rounded-[40px] p-10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
              <Icon name="faUser" className="text-purple-700" />
              Dados pessoais
            </h2>
            {!loading && usuario && (
              <div className="flex items-center gap-3">
                <Button
                  icon={editando ? 'faXmark' : 'faPen'}
                  onClick={() => setEditando(!editando)}
                  className="text-purple-700 hover:opacity-75 transition-opacity"
                />
                <Button
                  icon="faTrash"
                  onClick={deleteUsuario}
                  disabled={excluindo}
                  className="text-[#ff5c8a] hover:opacity-75 transition-opacity disabled:opacity-50"
                />
              </div>
            )}
          </div>

          {loading ? (
            <p className="text-gray-400 animate-pulse">Carregando...</p>
          ) : !usuario ? (
            <p className="text-red-500 text-sm">Erro ao carregar dados.</p>
          ) : editando ? (
            <form action={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Nome</p>
                  <Input variant='white' name="nome" type="text" placeholder="Nome" required defaultValue={usuario.nome} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Telefone</p>
                  <Input variant='white' name="telefone" type="tel" placeholder="Telefone" required defaultValue={usuario.telefone} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-400 uppercase font-semibold">E-mail</p>
                  <p className="font-medium text-gray-500">{usuario.email}</p>
                  <p className="text-xs text-gray-400">O e-mail não pode ser alterado.</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-400 uppercase font-semibold">CPF</p>
                  <p className="font-medium text-gray-500">{usuario.cpf}</p>
                  <p className="text-xs text-gray-400">O CPF não pode ser alterado.</p>
                </div>
              </div>
              <Button
                text={atualizando ? 'Salvando...' : 'Salvar alterações'}
                type="submit"
                disabled={atualizando}
              />
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Nome</p>
                <p className="font-medium text-gray-900">{usuario.nome}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">E-mail</p>
                <p className="font-medium text-gray-900">{usuario.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">CPF</p>
                <p className="font-medium text-gray-900">{usuario.cpf}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Telefone</p>
                <p className="font-medium text-gray-900">{usuario.telefone}</p>
              </div>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-5">
          <EnderecoList />
        </section>

      </div>
    </main>
  );
};