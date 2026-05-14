'use client'

import { useEffect } from "react";
import { CategoriaCard } from "./CategoriaCard";
import { useGetCategorias } from "@/src/hooks/categoria/useGetCategorias";

export const CategoriaList = () => {
    const { execute, categorias, error } = useGetCategorias();

    useEffect(() => {
        execute(true);
    }, [execute]);

    if (error) return null;

    return (
        <div className="flex flex-wrap gap-5 justify-center p-6 pb-15">
            {categorias.map((categoria) => (
                <CategoriaCard key={categoria.id_categoria} id={categoria.id_categoria} name={categoria.nome} />
            ))}
        </div>
    );
}