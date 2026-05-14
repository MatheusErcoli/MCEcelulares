'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@/src/components/layout/Icon';
import { useCreateProduto } from '@/src/hooks/produto/useCreateProduto';
import { Button } from '@/src/components/layout/Button';
import { useState } from 'react';
import { CategoriaDropdownAdm } from './CategoriaDropdownAdm';
import { MarcaDropdownAdm } from './MarcaDropdownAdm';
import { Input } from '@/src/components/layout/Input';

export const ProdutoForm = () => {
    const router = useRouter();
    const { execute: createProduto, loading } = useCreateProduto();

    const [imagemUrl, setImagemUrl] = useState<string>('');
    const [loadingFile, setLoadingFile] = useState(false);
    const [idCategoria, setIdCategoria] = useState<string>('');
    const [idMarca, setIdMarca] = useState<string>('');

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setLoadingFile(true);

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ml_default");
        data.append("cloud_name", "dxahbqe6q");

        const response = await fetch("https://api.cloudinary.com/v1_1/dxahbqe6q/image/upload", {
            method: "POST",
            body: data,
        });

        const uploadedImageUrl = await response.json();
        setImagemUrl(uploadedImageUrl.secure_url);
        setLoadingFile(false);
    };

    const handleSubmit = async (formData: FormData) => {
        const result = await createProduto(formData);
        if (result?.success) router.back();
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                action={handleSubmit}
                className="bg-gray-200 text-zinc-950 p-10 rounded-[40px] shadow-xl flex flex-col gap-6 w-full max-w-lg relative"
            >
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="absolute right-6 top-4 z-50 flex flex-row-reverse items-center gap-1 text-purple-700 transition-all hover:opacity-80"
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
                <h2 className="text-3xl font-bold text-zinc-900 mb-2 flex items-center gap-3">
                    <Icon name="faBox" className="w-8" />
                    Cadastrar produto
                </h2>

                <Input
                    variant='white'
                    name="nome"
                    type="text"
                    placeholder="Nome do produto"
                    required
                    minLength={2}
                    maxLength={150}
                    title="O nome deve ter entre 2 e 150 caracteres."
                />

                <textarea
                    name="descricao"
                    required
                    placeholder="Descrição do produto..."
                    rows={4}
                    minLength={5}
                    maxLength={500}
                    title="A descrição deve ter entre 5 e 500 caracteres."
                    className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none resize-none"
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        variant='white'
                        name="preco"
                        type="number"
                        placeholder="Preço (R$)"
                        required
                        min={0.01}
                        title="Informe um preço válido maior que zero."
                    />
                    <Input
                        variant='white'
                        name="estoque"
                        type="number"
                        placeholder="Estoque"
                        required
                        min={0}
                        step={1}
                        title="Informe a quantidade em estoque."
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
                        required
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
                            onChange={(val) => {
                                setIdCategoria(val);
                                setIdMarca('');
                            }}
                        />
                        <input type="hidden" name="id_categoria" value={idCategoria} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-500 uppercase font-semibold px-2">Marca</p>
                        <MarcaDropdownAdm
                            value={idMarca}
                            onChange={setIdMarca}
                        />
                        <input type="hidden" name="id_marca" value={idMarca} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-500 uppercase font-semibold px-2">Destaque</p>
                        <select
                            name="destaque"
                            required
                            defaultValue=""
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
                            defaultValue=""
                            className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none appearance-none cursor-pointer"
                        >
                            <option value="" disabled>Selecione...</option>
                            <option value="1">Ativo</option>
                            <option value="0">Inativo</option>
                        </select>
                    </div>
                </div>

                <Button
                    text={loading ? 'Salvando...' : 'Salvar produto'}
                    type="submit"
                    disabled={loading}
                />
            </form>
        </div>
    );
};