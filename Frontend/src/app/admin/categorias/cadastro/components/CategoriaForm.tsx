'use client';

import { useRouter } from 'next/navigation';
import { Input } from '@/src/components/layout/Input';
import { Icon } from '@/src/components/layout/Icon';
import { useCreateCategoria } from '@/src/hooks/categoria/useCreateCategoria';
import { Button } from '@/src/components/layout/Button';

export const CategoriaForm = () => {
    const router = useRouter();
    const { execute: createCategoria, loading } = useCreateCategoria();

    const handleSubmit = async (formData: FormData) => {
        const result = await createCategoria(formData);
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
                    <Icon name="faList" className="w-8" />
                    Cadastrar categoria
                </h2>

                <Input
                    variant="white"
                    name="nome"
                    type="text"
                    placeholder="Nome da categoria"
                    required
                    minLength={2}
                    maxLength={100}
                    title="O nome deve ter entre 2 e 100 caracteres."
                />

                <textarea
                    name="descricao"
                    required
                    placeholder="Descrição da categoria..."
                    rows={4}
                    minLength={5}
                    maxLength={300}
                    title="A descrição deve ter entre 5 e 300 caracteres."
                    className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none resize-none"
                />

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

                <Button
                    text={loading ? 'Salvando...' : 'Salvar categoria'}
                    type="submit"
                    disabled={loading}
                />
            </form>
        </div>
    );
};