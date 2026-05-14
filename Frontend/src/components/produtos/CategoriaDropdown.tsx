'use client';

import { useEffect } from 'react';
import { useGetCategorias } from '@/src/hooks/categoria/useGetCategorias';

type DropdownVariant = "gray" | "white";

type CategoriaDropdownProps = {
    value: string;
    onChange: (value: string) => void;
    variant?: DropdownVariant;
    ativo?: boolean;
}

const variantStyles: Record<DropdownVariant, string> = {
    gray: `
        appearance-none cursor-pointer
        bg-gray-100 hover:bg-gray-200
        text-gray-800 font-medium text-sm
        px-5 py-2.5 pr-9
        rounded-full
        border-none outline-none
        bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%200l5%206%205-6z%22%2F%3E%3C%2Fsvg%3E')]
        bg-no-repeat bg-[right_14px_center]
        transition-colors duration-150
        disabled:cursor-not-allowed disabled:opacity-50
    `,
    white: `
        appearance-none cursor-pointer
        bg-white hover:bg-gray-50
        text-gray-800 font-medium text-sm
        px-5 py-2.5 pr-9
        rounded-full
        border border-gray-200 outline-none shadow-sm
        bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%200l5%206%205-6z%22%2F%3E%3C%2Fsvg%3E')]
        bg-no-repeat bg-[right_14px_center]
        transition-colors duration-150
        disabled:cursor-not-allowed disabled:opacity-50
    `,
};

export const CategoriaDropdown = ({ value, onChange, variant = "gray", ativo }: CategoriaDropdownProps) => {
    const { execute, categorias, loading, error } = useGetCategorias();

    useEffect(() => {
        execute(ativo);
    }, [execute, ativo]);

    if (error) return null;

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={loading || categorias.length === 0}
            className={variantStyles[variant]}
        >
            <option value="">
                {loading ? 'Carregando...' : 'Todas as categorias'}
            </option>
            {categorias.map((c) => (
                <option key={c.id_categoria} value={String(c.id_categoria)}>
                    {c.nome}
                </option>
            ))}
        </select>
    );
};