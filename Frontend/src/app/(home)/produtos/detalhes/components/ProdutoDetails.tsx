'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';
import { useGetProduto } from '@/src/hooks/produto/useGetProduto';
import { useCreateItemCarrinho } from '@/src/hooks/carrinho/useCreateItemCarrinho';
import { Button } from '@/src/components/layout/Button';
import Image from 'next/image';

export const ProdutoDetails = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = Number(searchParams.get('id'));

    const { execute: buscarProduto, produto, loading, error } = useGetProduto();
    const { execute: adicionarAoCarrinho, loading: adicionando, error: erroCarrinho } = useCreateItemCarrinho();

    useEffect(() => {
        buscarProduto(id);
    }, [id,buscarProduto]);

    const handleAdd = async () => {

        const res = await adicionarAoCarrinho(produto!.id_produto);
        if (res.success) router.push('/carrinho');
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-gray-500 text-xl animate-pulse">Carregando...</p>
        </div>
    );

    if (error || !produto) return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-red-500 text-xl">Produto não encontrado.</p>
        </div>
    );

    const semEstoque = produto.estoque <= 0;

    return (
        <div className="flex h-[calc(100vh-80px)]">
            <div className="w-1/2 bg-[#E5E7EB]/40 flex items-center justify-center p-12">
                <Image
                    src={produto.imagem ?? "https://placehold.co/200x200/e5e7eb/9ca3af/png?text=Sem+imagem"}
                    alt={produto.nome}
                    className="object-contain max-h-full max-w-full"
                    width={500}
                    height={0}
                />
            </div>

            <div className="w-1/2 flex flex-col justify-center items-center px-16 gap-6">
                <div className="flex flex-col gap-6 w-full max-w-md">
                    <div className="flex gap-3">
                        {produto.categoria && (
                            <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1 rounded-full">
                                {produto.categoria.nome}
                            </span>
                        )}
                        {produto.marca && (
                            <span className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-1 rounded-full">
                                {produto.marca.nome}
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl font-bold text-black leading-tight">
                        {produto.nome}
                    </h1>

                    <p className="text-gray-500 text-lg leading-relaxed">
                        {produto.descricao}
                    </p>

                    <p className="text-4xl font-bold text-purple-800">
                        R${Number(produto.preco).toFixed(2).replace('.', ',')}
                    </p>

                    {!produto.ativo ? (
                        <span className="bg-red-100 text-red-600 text-sm font-semibold px-4 py-1 rounded-full w-fit">
                            Inativo
                        </span>
                    ) : semEstoque ? (
                        <p className="text-red-500 text-sm font-semibold">Produto esgotado</p>
                    ) : (
                        <p className="text-gray-500 text-sm">
                            Em estoque: <span className="text-gray-500">{produto.estoque}</span>
                        </p>
                    )}

                    {erroCarrinho && (
                        <p className="text-red-500 text-sm font-medium">{erroCarrinho}</p>
                    )}

                    <div className="max-w-xs">
                        <Button
                            text={adicionando ? 'Adicionando...' : 'Adicionar ao carrinho'}
                            icon="faCartShopping"
                            onClick={handleAdd}
                            disabled={adicionando || semEstoque || !produto.ativo}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};