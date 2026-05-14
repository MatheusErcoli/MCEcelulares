'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';
import { getUsuarioAPI } from '@/src/actions/usuario';
import { Icon } from '@/src/components/layout/Icon'; 

const UsuarioDetalhes = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { token } = useAuth();
    const router = useRouter();

    const [usuario, setUsuario] = useState<UsuarioType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id || !token) return;

        setLoading(true);
        getUsuarioAPI(token, { id_usuario: Number(id) })
            .then((data) => {
                if (!data.success) throw new Error(data.error);
                setUsuario(data.usuario!);
            })
            .catch((err) => setError((err as Error).message))
            .finally(() => setLoading(false));
    }, [id, token]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[300px]">
            <p className="text-gray-400 font-medium animate-pulse">Carregando usuário...</p>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-[300px]">
            <p className="text-red-500 font-medium">{error}</p>
        </div>
    );

    if (!usuario) return null;

    return (
        <div className="container mx-auto pt-8 pb-10 px-10 max-w-3xl">

            <div className="flex items-center gap-5 mb-8 relative">
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
                <span className="absolute right-6 top-12 text-gray-400 text-sm font-mono">#{usuario.id_usuario}</span>

                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-gray-500 font-bold text-2xl">
                        {usuario.nome.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-800">{usuario.nome}</h1>
                    <p className="text-gray-500 text-sm">{usuario.email}</p>
                    <div className="flex gap-2 mt-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${usuario.admin
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                            {usuario.admin ? 'Administrador' : 'Cliente'}
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${usuario.ativo
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-600'
                            }`}>
                            {usuario.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="
                bg-white border border-gray-200 rounded-2xl
                shadow-sm px-6 py-5 mb-6
            ">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    Informações pessoais
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoRow label="Nome" value={usuario.nome} />
                    <InfoRow label="E-mail" value={usuario.email} />
                    <InfoRow label="CPF" value={usuario.cpf} />
                    <InfoRow label="Telefone" value={usuario.telefone} />
                </div>
            </div>

            {usuario.enderecos && usuario.enderecos.length > 0 && (
                <div className="
                    bg-white border border-gray-200 rounded-2xl
                    shadow-sm px-6 py-5
                ">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        Endereços ({usuario.enderecos.length})
                    </h2>
                    <div className="flex flex-col gap-3">
                        {usuario.enderecos.map((end) => (
                            <div
                                key={end.id_endereco}
                                className="
                                    border border-gray-100 rounded-xl px-4 py-3
                                    bg-gray-50 text-sm text-gray-700
                                "
                            >
                                <p className="font-medium">
                                    {end.endereco}, {end.numero}
                                    {end.complemento ? ` - ${end.complemento}` : ''}
                                </p>
                                <p className="text-gray-500">
                                    {end.bairro ? `${end.bairro}, ` : ''}{end.cidade} - {end.estado}
                                </p>
                                <p className="text-gray-400 text-xs mt-1">CEP: {end.cep}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {usuario.enderecos && usuario.enderecos.length === 0 && (
                <p className="text-center text-gray-400 text-sm mt-4">
                    Este usuário não possui endereços cadastrados.
                </p>
            )}
        </div>
    );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
        <p className="text-gray-800 text-sm font-medium">{value || '—'}</p>
    </div>
);

export default UsuarioDetalhes;