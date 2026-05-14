'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetMarcas } from '@/src/hooks/marca/useGetMarcas';
import { useUpdateMarca } from '@/src/hooks/marca/useUpdateMarca';
import { useDeleteMarca } from '@/src/hooks/marca/useDeleteMarca';
import { Icon } from '@/src/components/layout/Icon';
import { Input } from '@/src/components/layout/Input';
import { Button } from '@/src/components/layout/Button';

export const UpdateMarcaForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = Number(searchParams.get('id'));

  const { execute: fetchMarcas, marcas, loading } = useGetMarcas();
  const { execute: updateMarca, loading: atualizando } = useUpdateMarca();
  const { execute: deleteMarca, loading: excluindo } = useDeleteMarca();

  const [editando, setEditando] = useState(false);
  const [marcaLocal, setMarcaLocal] = useState<MarcaType | null>(null);

  useEffect(() => {
    if (id) fetchMarcas();
  }, [id,fetchMarcas]);

  useEffect(() => {
    const found = marcas.find((m) => m.id_marca === id) ?? null;
    if (found) setMarcaLocal(found);
  }, [marcas, id]);

  const handleSubmit = async (formData: FormData) => {
    const result = await updateMarca(id, formData);
    if (result?.success) {
      setMarcaLocal({
        ...marcaLocal!,
        nome: formData.get('nome') as string,
        ativo: formData.get('ativo') === '1',
      });
      setEditando(false);
    }
  };

  const handleDelete = async () => {
    const result = await deleteMarca(id);
    if (result.success) router.push('/admin/marcas');
  };

  return (
    <main className="min-h-screen md:p-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">

        <h1 className="text-4xl font-bold">Editar Marca</h1>

        <section className="bg-gray-200 rounded-[40px] p-10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
              <Icon name="faStar" className="text-purple-700" />
              Dados da marca
            </h2>
            {!loading && marcaLocal && (
              <div className="flex items-center gap-3">
                <Button
                  icon={editando ? 'faXmark' : 'faPen'}
                  onClick={() => setEditando(!editando)}
                  className="text-purple-700 hover:opacity-75 transition-opacity"
                />
                <Button
                  icon="faTrash"
                  onClick={handleDelete}
                  disabled={excluindo}
                  className="text-[#ff5c8a] hover:opacity-75 transition-opacity disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex flex-row-reverse items-center gap-2 text-purple-700 transition-all hover:opacity-80"
                >
                  <div className="flex h-5 w-5 m-0 items-center justify-center">
                    <Icon
                      name="faRightFromBracket"
                      className="text-purple-700"
                      size="lg"
                    />
                  </div>
                  <span className="text-md font-medium">Voltar</span>
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <p className="text-gray-400 animate-pulse">Carregando...</p>
          ) : !marcaLocal ? (
            <p className="text-red-500 text-sm">Erro ao carregar dados da marca.</p>
          ) : editando ? (
            <form action={handleSubmit} className="flex flex-col gap-6">
              <Input
                variant="white"
                name="nome"
                type="text"
                placeholder="Nome da marca"
                required
                minLength={2}
                maxLength={100}
                title="O nome deve ter entre 2 e 100 caracteres."
                defaultValue={marcaLocal.nome}
              />
              <div className="flex flex-col gap-2">
                <p className="text-xs text-gray-500 uppercase font-semibold px-2">Status</p>
                <select
                  name="ativo"
                  required
                  defaultValue={marcaLocal.ativo ? '1' : '0'}
                  className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>Selecione...</option>
                  <option value="1">Ativo</option>
                  <option value="0">Inativo</option>
                </select>
              </div>
              <Button
                text={atualizando ? 'Salvando...' : 'Salvar alterações'}
                type="submit"
                disabled={atualizando}
              />
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Nome</p>
                <p className="font-medium text-gray-900">{marcaLocal.nome}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">ID</p>
                <p className="font-medium text-gray-900">#{marcaLocal.id_marca}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Status</p>
                <p className="font-medium text-gray-900">{marcaLocal.ativo ? 'Ativo' : 'Inativo'}</p>
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
};