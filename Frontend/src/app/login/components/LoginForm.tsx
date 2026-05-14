"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogin } from "@/src/hooks/auth/useLogin";
import { Button } from "@/src/components/layout/Button";
import { Input } from "@/src/components/layout/Input";

export default function LoginForm() {
  const { execute: login, loading } = useLogin();
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    const result = await login(formData);
    if (result.success) router.push("/");
  };

  return (
    <>
      <form action={handleLogin} className="space-y-5">

        <div className="space-y-5">
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            required={true}
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            title="Digite um e-mail válido (ex: usuario@dominio.com)"
          />

          <Input
            name="senha"
            type="password"
            placeholder="Senha"
            required={true}
          />
        </div>

        <Button
          text={loading ? "Entrando..." : "Entrar"}
          type="submit"
          disabled={loading}
        />
      </form>

      <div className="text-center text-sm mt-6 text-gray-600">
        Não tem uma conta?{" "}
        <Link href="/cadastro" className="text-[#7929c8] font-bold hover:underline">
          Cadastre-se aqui
        </Link>
      </div>
    </>
  );
}