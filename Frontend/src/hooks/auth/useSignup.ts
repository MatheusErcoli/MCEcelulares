import { signupAPI } from "@/src/actions/auth";
import { useCallback, useState } from "react";
import Swal from "sweetalert2";

export function useSignup() {
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      const data = await signupAPI(formData);

      if (!data.success) throw new Error(data.error);

      Swal.fire({
        icon: "success",
        title: "Cadastro realizado com sucesso!",
        text: "Agora faça login para utilizar sua conta.",
      });
      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao cadastrar",
        text: (error as Error).message || "Erro ao criar conta",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading };
}