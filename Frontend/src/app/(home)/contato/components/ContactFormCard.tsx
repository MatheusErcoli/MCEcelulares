"use client";

import { Button } from "@/src/components/layout/Button";
import { Icon } from "@/src/components/layout/Icon";
import { Input } from "@/src/components/layout/Input";
import { useSendEmail } from "@/src/hooks/contato/useSendEmail";

export const ContactFormCard = () => {
    const { execute, loading } = useSendEmail();

    const handleSubmit = async (formData: FormData) => {
        await execute(formData);
    };

    return (
        <form
            action={handleSubmit}
            className="bg-gray-200 text-zinc-950 p-10 rounded-[40px] shadow-xl flex flex-col gap-6"
        >
            <h2 className="text-3xl font-bold text-zinc-900 mb-2 flex items-center gap-3">
                <Icon name="faPaperPlane" className="w-8" />
                Mande a sua mensagem!
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input variant="white" name="nome" type="text" placeholder="Nome Completo" required={true} minLength={3} maxLength={100} title="O nome deve ter entre 3 e 100 caracteres." />
                <Input variant="white" name="telefone" type="tel" placeholder="Telefone: (99) 99999-9999" required={true} pattern="\d{11}" title="O telefone deve ter 11 dígitos." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input variant="white" name="email" type="email" placeholder="E-mail" required={true} pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title="Digite um e-mail válido (ex: usuario@dominio.com)" />
                <Input variant="white" name="assunto" type="text" placeholder="Assunto" required={true} minLength={5} maxLength={30} title="O assunto deve ter entre 5 e 30 caracteres." />
            </div>

            <div className="flex flex-col gap-2">
                <textarea
                    name="mensagem"
                    required
                    placeholder="Digite a sua mensagem..."
                    rows={4}
                    minLength={20}
                    maxLength={200}
                    className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none resize-none"
                />
            </div>

            <Button
                text={loading ? "Enviando..." : "Enviar Mensagem"}
                icon="faEnvelope"
                type="submit"
                disabled={loading}
            />
        </form>
    );
};