'use client';

import Link from 'next/link';

type Marca = {
    id_marca: number;
    nome: string;
};

type MarcaCardProps = {
    marca: Marca;
};

export const MarcaCard = ({ marca }: MarcaCardProps) => {
    return (
        <Link href={`/admin/marcas/edicao?id=${marca.id_marca}`} className="
            flex items-center justify-between
            bg-white hover:bg-gray-50
            border border-gray-200 hover:border-gray-300
            rounded-2xl
            px-5 py-4
            shadow-sm hover:shadow-md
            transition-all duration-150
            cursor-pointer
            group
        ">
            <div className="flex items-center gap-3">
                <div className="
                    w-9 h-9 rounded-full
                    bg-gray-100 group-hover:bg-gray-200
                    flex items-center justify-center
                    transition-colors duration-150
                    shrink-0
                ">
                    <span className="text-gray-500 font-semibold text-sm">
                        {marca.nome.charAt(0).toUpperCase()}
                    </span>
                </div>

                <span className="text-gray-800 font-medium text-sm truncate">
                    {marca.nome}
                </span>
            </div>

            <span className="text-gray-400 text-xs font-mono">
                #{marca.id_marca}
            </span>
        </Link>
    );
};