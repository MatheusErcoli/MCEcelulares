'use client';

import { sendEmailAction } from "@/src/actions/sendEmail";
import { useCallback, useState } from "react";
import Swal from "sweetalert2";

export const useSendEmail = () => {
    const [loading, setLoading] = useState(false);

    const execute = useCallback(async (formData: FormData) => {
        setLoading(true);
        try {
            const result = await sendEmailAction(formData);

            if (!result.success) throw new Error(result.error);

            Swal.fire({
                icon: "success",
                title: "Mensagem enviada!",
                text: "Entraremos em contato em breve.",
            });

            return { success: true };
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Erro ao enviar",
                text: (error as Error).message || "Não foi possível enviar email.",
            });

            return { success: false, error: (error as Error).message };
        } finally {
            setLoading(false);
        }
    }, []);

    return { execute, loading };
};