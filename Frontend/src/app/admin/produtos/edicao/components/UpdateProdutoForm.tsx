'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetProduto } from '@/src/hooks/produto/useGetProduto';
import { useUpdateProduto } from '@/src/hooks/produto/useUpdateProduto';
import { useDeleteProduto } from '@/src/hooks/produto/useDeleteProduto';
import { Icon } from '@/src/components/layout/Icon';
import { Input } from '@/src/components/layout/Input';
import { Button } from '@/src/components/layout/Button';
import { CategoriaDropdownAdm } from '../../cadastro/components/CategoriaDropdownAdm';
import { MarcaDropdownAdm } from '../../cadastro/components/MarcaDropdownAdm';
import Image from 'next/image';

export const UpdateProdutoForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = Number(searchParams.get('id'));

  const { execute: fetchProduto, produto, loading } = useGetProduto();
  const { execute: updateProduto, loading: atualizando } = useUpdateProduto();
  const { execute: deleteProduto, loading: excluindo } = useDeleteProduto();

  const [editando, setEditando] = useState(false);
  const [imagemUrl, setImagemUrl] = useState<string>('');
  const [loadingFile, setLoadingFile] = useState(false);
  const [idCategoria, setIdCategoria] = useState<string>('');
  const [idMarca, setIdMarca] = useState<string>('');

  useEffect(() => {
    if (id) fetchProduto(id);
  }, [id,fetchProduto]);

  useEffect(() => {
    if (editando && produto) {
      setImagemUrl(produto.imagem ?? '');
      setIdCategoria(String(produto.id_categoria ?? ''));
      setIdMarca(String(produto.id_marca ?? ''));
    }
  }, [editando, produto]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoadingFile(true);

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ml_default');
    data.append('cloud_name', 'dxahbqe6q');

    const response = await fetch('https://api.cloudinary.com/v1_1/dxahbqe6q/image/upload', {
      method: 'POST',
      body: data,
    });

    const uploadedImageUrl = await response.json();
    setImagemUrl(uploadedImageUrl.secure_url);
    setLoadingFile(false);
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await updateProduto(id, formData);
    if (result?.success) {
      setEditando(false);
      fetchProduto(id);
    }
  };

  const handleDelete = async () => {
    const result = await deleteProduto(id);
    if (result.success) router.push('/admin/produtos');
  };

  return (
    <main className="min-h-screen md:p-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">

        <h1 className="text-4xl font-bold">Editar Produto</h1>

        <section className="bg-gray-200 rounded-[40px] p-10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
              <Icon name="faBox" className="text-purple-700" />
              Dados do produto
            </h2>
            {!loading && produto && (
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
          ) : !produto ? (
            <p className="text-red-500 text-sm">Erro ao carregar dados do produto.</p>
          ) : editando ? (
            <form action={handleSubmit} className="flex flex-col gap-6">

              <Input
                variant="white"
                name="nome"
                type="text"
                placeholder="Nome do produto"
                required
                minLength={2}
                maxLength={150}
                title="O nome deve ter entre 2 e 150 caracteres."
                defaultValue={produto.nome ?? ''}
              />

              <textarea
                name="descricao"
                required
                placeholder="Descrição do produto..."
                rows={4}
                minLength={5}
                maxLength={500}
                title="A descrição deve ter entre 5 e 500 caracteres."
                defaultValue={produto.descricao ?? ''}
                className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none resize-none"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  variant="white"
                  name="preco"
                  type="number"
                  placeholder="Preço (R$)"
                  required
                  min={0.01}
                  step={0.01}
                  title="Informe um preço válido maior que zero."
                  defaultValue={produto.preco ?? 0}
                />
                <Input
                  variant="white"
                  name="estoque"
                  type="number"
                  placeholder="Estoque"
                  required
                  min={0}
                  step={1}
                  title="Informe a quantidade em estoque."
                  defaultValue={produto.estoque ?? 0}
                />
              </div>

              <div>
                {loadingFile && <p>Enviando imagem...</p>}
                {imagemUrl && (
                  <img src={imagemUrl} alt="Preview" className="w-32 h-32 object-cover rounded-xl mb-2" />
                )}
                <input
                  id="imagem-upload"
                  name="_imagem_file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="imagem-upload"
                  className="flex items-center gap-3 w-full rounded-[30px] bg-white px-6 py-4 text-gray-400 cursor-pointer transition-all hover:ring-2 hover:ring-[#7929c8]/50"
                >
                  <Icon name="faImage" className="w-4 text-gray-400" />
                  <span className="truncate">
                    {imagemUrl ? 'Imagem selecionada ✓' : 'Imagem do produto'}
                  </span>
                </label>
                <input type="hidden" name="imagem" value={imagemUrl} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500 uppercase font-semibold px-2">Categoria</p>
                  <CategoriaDropdownAdm
                    value={idCategoria}
                    onChange={(val) => { setIdCategoria(val); setIdMarca(''); }}
                  />
                  <input type="hidden" name="id_categoria" value={idCategoria} />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500 uppercase font-semibold px-2">Marca</p>
                  <MarcaDropdownAdm value={idMarca} onChange={setIdMarca} />
                  <input type="hidden" name="id_marca" value={idMarca} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500 uppercase font-semibold px-2">Destaque</p>
                  <select
                    name="destaque"
                    required
                    defaultValue={produto.destaque ? '1' : '0'}
                    className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Selecione...</option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500 uppercase font-semibold px-2">Status</p>
                  <select
                    name="ativo"
                    required
                    defaultValue={produto.ativo ? '1' : '0'}
                    className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Selecione...</option>
                    <option value="1">Ativo</option>
                    <option value="0">Inativo</option>
                  </select>
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
                <p className="font-medium text-gray-900">{produto.nome}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Preço</p>
                <p className="font-medium text-gray-900">R$ {produto.preco}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-400 uppercase font-semibold">Descrição</p>
                <p className="font-medium text-gray-900">{produto.descricao}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Estoque</p>
                <p className="font-medium text-gray-900">{produto.estoque} unidades</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Status</p>
                <p className="font-medium text-gray-900">{produto.ativo ? 'Ativo' : 'Inativo'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Destaque</p>
                <p className="font-medium text-gray-900">{produto.destaque ? 'Sim' : 'Não'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Categoria</p>
                <p className="font-medium text-gray-900">
                  {produto.categoria ? produto.categoria.nome : `ID ${produto.id_categoria}`}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Marca</p>
                <p className="font-medium text-gray-900">
                  {produto.marca ? produto.marca.nome : `ID ${produto.id_marca}`}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-400 uppercase font-semibold">Imagem</p>
                <Image
                  src={produto.imagem ?? "https://placehold.co/200x200/e5e7eb/9ca3af/png?text=Sem+imagem"}
                  alt={produto.nome ?? 'Produto'}
                  width={128}
                  height={128}
                  className="mt-2 h-32 object-contain rounded-2xl bg-white p-2"
                />
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
};