'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetCategorias } from '@/src/hooks/categoria/useGetCategorias';
import { CategoriaCard } from './CategoriaCard';
import { Icon } from '@/src/components/layout/Icon';
import { AtivoDropdown } from '../../components/AtivoDropdown';

export const CategoriaList = () => {
    const router = useRouter();
    const { execute, categorias, loading, error } = useGetCategorias();
    const [ativo, setAtivo] = useState('');

    const handleAtivoChange = (value: string) => {
        setAtivo(value);
    };

    useEffect(() => {
        execute(ativo === '' ? undefined : ativo === 'true');
    }, [ativo, execute]);

    return (
        <div className="container mx-auto pt-5 pb-5 px-10">
            <div className="flex justify-center items-center gap-10 mb-10">
                <AtivoDropdown value={ativo} onChange={handleAtivoChange} />

                <button
                    onClick={() => router.push('/admin/categorias/cadastro')}
                    className="
        appearance-none cursor-pointer
        bg-white hover:bg-gray-50
        text-gray-800 font-medium text-sm
        px-5 py-2.5
        rounded-full
        border border-gray-200 outline-none shadow-sm
        transition-colors duration-150
        disabled:cursor-not-allowed disabled:opacity-50
                    "
                >
                    Adicionar categoria
                    <Icon name='faPlus' className='pl-2'/>
                </button>
            </div>

            {loading && <p className="text-center font-medium text-gray-400 animate-pulse">Carregando categorias...</p>}
            {error && <p className="text-center font-medium text-red-600 animate-pulse">{error}</p>}
            {!loading && !error && categorias.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                    <Icon name="faTag" />
                    <p className="text-sm font-medium">Nenhuma categoria encontrada.</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categorias.map((c) => (
                    <CategoriaCard key={c.id_categoria} categoria={c} />
                ))}
            </div>
        </div>
    );
};