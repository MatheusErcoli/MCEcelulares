import { loginAPI } from "@/src/actions/auth";
import { useAuth } from "@/src/contexts/AuthContext";
import { useCallback, useState } from "react";
import Swal from "sweetalert2";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const execute = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      const data = await loginAPI(formData);

      if (!data.success) throw new Error(data.error);

      login(data.token!, data.id_usuario!, data.nome!, data.admin!);

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao entrar",
        text: (error as Error).message || "Erro ao fazer login",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [login]);

  return { execute, loading };
};