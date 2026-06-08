"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignup } from "@/src/hooks/auth/useSignup";
import { Button } from "@/src/components/layout/Button";
import { Input } from "@/src/components/layout/Input";
import Swal from "sweetalert2";

export const SignupForm = () => {
  const { execute: signup, loading } = useSignup();
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senhaErro, setSenhaErro] = useState("");
  const [, setTentouEnviar] = useState(false);
  const router = useRouter();

  const senhaRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}/;
  const senhasNaoCoincidem = confirmarSenha !== senha;

  const validarSenha = (value: string) => {
    setSenha(value);
    if (value === "") {
      setSenhaErro("");
      return;
    }
    setSenhaErro(
      senhaRegex.test(value)
        ? ""
        : "Mínimo 8 caracteres, com maiúscula, minúscula, número e símbolo."
    );
  };

const handleSignup = async (formData: FormData) => {
  setTentouEnviar(true);

  if (senhasNaoCoincidem) {
    Swal.fire({
      icon: "error",
      title: "Senhas não coincidem",
      text: "A senha e a confirmação de senha devem ser iguais.",
    });
    return;
  }

  if (senhaErro) return;

  const result = await signup(formData);
  if (result.success) router.push("/login");
};

  return (
    <form action={handleSignup} className="space-y-5">

      <Input name="nome" type="text" placeholder="Nome Completo" required minLength={3} maxLength={100} />
      <Input name="email" type="email" placeholder="E-mail" required pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title="Digite um e-mail válido (ex: usuario@dominio.com)" />

      <div className="flex gap-4">
        <Input name="cpf" type="text" placeholder="CPF" required pattern="(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})" title="CPF deve ter 11 números ou o formato 000.000.000-00" mask="000.000.000-00" />
        <Input name="telefone" type="tel" placeholder="Telefone" required minLength={10} maxLength={15} mask="(00) 00000-0000" />
      </div>

      <div className="flex flex-col gap-1">
        <Input
          name="senha"
          type="password"
          placeholder="Criar Senha"
          required
          onChange={(e) => validarSenha(e.target.value)}
        />
        {senhaErro && (
          <p className="text-red-600 text-sm font-medium px-2">
            {senhaErro}
          </p>
        )}
      </div>

<div className="flex flex-col gap-1">
  <Input
    name="confirmarSenha"
    type="password"
    placeholder="Repetir Senha"
    required
    onChange={(e) => setConfirmarSenha(e.target.value)}
  />
</div>

      <Button
        text={loading ? "Cadastrando..." : "Cadastrar Agora"}
        type="submit"
        disabled={loading}
      />

      <div className="text-center">
        <p className="text-gray-600">
          Já tem uma conta?{" "}
          <Link href="/login" className="font-bold text-[#5714d7] hover:underline">
            Faça Login
          </Link>
        </p>
      </div>
    </form>
  );
};