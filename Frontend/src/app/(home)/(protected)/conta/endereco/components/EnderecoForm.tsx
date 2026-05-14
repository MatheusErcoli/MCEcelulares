'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@/src/components/layout/Icon';
import { useCreateEndereco } from '@/src/hooks/endereco/useCreateEndereco';
import { Button } from '@/src/components/layout/Button';
import { Input } from '@/src/components/layout/Input';
import Link from 'next/link';

export const EnderecoForm = () => {
    const router = useRouter();
    const { execute: createEndereco, loading } = useCreateEndereco();

    const handleSubmit = async (formData: FormData) => {
        const result = await createEndereco(formData);
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
                    <Icon name="faLocationDot" className="w-8" />
                    Cadastrar endereço
                </h2>

                <Input variant='white' name="endereco" type="text" placeholder="Rua / Avenida" required />

                <div className="grid grid-cols-2 gap-4">
                    <Input variant='white' name="numero" type="text" placeholder="Número" required />
                    <Input variant='white' name="complemento" type="text" placeholder="Complemento (opcional)" />
                </div>

                <Input variant='white' name="bairro" type="text" placeholder="Bairro (opcional)" />

                <div className="grid grid-cols-2 gap-4">
                    <Input variant='white' name="cidade" type="text" placeholder="Cidade" required />
                    <Input variant='white' name="estado" type="text" placeholder="UF" required maxLength={2} />
                </div>

                <Input variant='white'
                    name="cep"
                    type="text"
                    placeholder="CEP (ex: 12345-678)"
                    required
                    mask="00000-000"
                    minLength={9}
                    pattern="\d{5}-\d{3}"
                    title="CEP deve estar no formato 12345-678"
                />

                <Button
                    text={loading ? 'Salvando...' : 'Salvar endereço'}
                    type="submit"
                    disabled={loading}
                />
            </form>
        </div>
    );
};