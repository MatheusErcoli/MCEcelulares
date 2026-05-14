'use server'

import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(2, "10 m"),
});

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export const sendEmailAction = async (formData: FormData) => {
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") ?? "127.0.0.1";

    try {
        const { success } = await ratelimit.limit(ip);
        if (!success) {
            return { success: false, error: "Limite de envio atingido. Tente em 10 minutos." };
        }
    } catch (e) {
        console.error("Erro no Upstash (Rate Limit):", e);
    }

    const nome     = escapeHtml(formData.get("nome"));
    const telefone = escapeHtml(formData.get("telefone"));
    const email    = escapeHtml(formData.get("email"));
    const assunto  = escapeHtml(formData.get("assunto"));
    const mensagem = escapeHtml(formData.get("mensagem"));

    try {
        await resend.emails.send({
            from: "Contato Site <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL as string,
            subject: `Novo Contato: ${assunto} - ${nome}`,
            replyTo: formData.get("email") as string,
            html: `
                <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #7929c8;">Novo contato através do site MCe Celulares</h2>
                    <p><strong>Nome:</strong> ${nome}</p>
                    <p><strong>Telefone:</strong> ${telefone}</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Assunto:</strong> ${assunto}</p>
                    <hr />
                    <p><strong>Mensagem:</strong></p>
                    <p style="background: #f4f4f4; padding: 15px; border-radius: 8px;">${mensagem}</p>
                </div>
            `,
        });

        return { success: true };
    } catch (error) {
        console.error("Erro ao enviar e-mail via Resend:", error);
        return { success: false, error: "Falha ao enviar o e-mail." };
    }
};