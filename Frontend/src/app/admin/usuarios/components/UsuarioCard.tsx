'use client';

import Link from 'next/link';

type UsuarioCardProps = {
    usuario: UsuarioType;
};

export const UsuarioCard = ({ usuario }: UsuarioCardProps) => {
    return (
        <Link href={`/admin/usuarios/detalhes?id=${usuario.id_usuario}`} className="
            flex flex-col gap-2
            bg-white hover:bg-gray-50
            border border-gray-200 hover:border-gray-300
            rounded-2xl
            px-5 py-4
            shadow-sm hover:shadow-md
            transition-all duration-150
            cursor-pointer
            group
        ">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="
                        w-9 h-9 rounded-full
                        bg-gray-100 group-hover:bg-gray-200
                        flex items-center justify-center
                        transition-colors duration-150
                        shrink-0
                    ">
                        <span className="text-gray-500 font-semibold text-sm">
                            {usuario.nome.charAt(0).toUpperCase()}
                        </span>
                    </div>

                    <span className="text-gray-800 font-medium text-sm truncate">
                        {usuario.nome}
                    </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-gray-400 text-xs font-mono">
                        #{usuario.id_usuario}
                    </span>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                        usuario.admin
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-500'
                    }`}>
                        {usuario.admin ? 'Admin' : 'Cliente'}
                    </span>
                </div>
            </div>

            <span className="text-gray-400 text-xs truncate w-full text-center">
                {usuario.email}
            </span>
        </Link>
    );
};