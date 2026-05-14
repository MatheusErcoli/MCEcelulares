'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Pagination } from "../../../../components/layout/Pagination";
import { useGetProdutos } from "@/src/hooks/produto/useGetProdutos";
import { ProdutoCard } from "@/src/components/produtos/ProdutoCard";
import { CategoriaDropdown } from "../../../../components/produtos/CategoriaDropdown";
import { MarcaDropdown } from "../../../../components/produtos/MarcaDropdown";
import { Icon } from "@/src/components/layout/Icon";

export const ProdutoPagination = () => {
    const searchParams = useSearchParams();
    const { execute, produtos, loading, totalPages, error } = useGetProdutos();
    const [currentPage, setCurrentPage] = useState(1);
    const [idCategoria, setIdCategoria] = useState(searchParams.get('id_categoria') ?? '');
    const [idMarca, setIdMarca] = useState('');

    const handleCategoriaChange = (value: string) => {
        setIdCategoria(value);
        setIdMarca('');
        setCurrentPage(1);
    };

    const handleMarcaChange = (value: string) => {
        setIdMarca(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        execute(currentPage, idCategoria || undefined, idMarca || undefined, undefined, true);
    }, [currentPage, idCategoria, idMarca, execute]);

    return (
        <div className="container mx-auto pt-15 pb-5 px-30">

            <div className="flex justify-center items-center gap-10 mb-10">
                <CategoriaDropdown value={idCategoria} onChange={handleCategoriaChange} ativo={true} />
                <MarcaDropdown value={idMarca} onChange={handleMarcaChange} id_categoria={idCategoria} ativo={true} />
            </div>

            {loading && (
                <p className="text-center font-medium text-gray-400 animate-pulse">
                    Carregando produtos...
                </p>
            )}

            {error && (
                <p className="text-center font-medium text-red-600 animate-pulse">
                    {error}
                </p>
            )}

            {!loading && !error && produtos.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                    <Icon name="faMobileScreen"/>
                    <p className="text-sm font-medium">Nenhuma produto encontrado.</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {produtos.map((p) => (
                    <ProdutoCard key={p.id_produto} produto={p} />
                ))}
            </div>

            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};