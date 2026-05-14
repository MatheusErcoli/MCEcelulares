"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/src/contexts/AuthContext";
import { Icon } from "./Icon";
import { LogoutButton } from "./LogoutButton";

const MAX_NOME_LENGTH = 12;

const formatNome = (nome: string) =>
  nome.length > MAX_NOME_LENGTH ? nome.slice(0, MAX_NOME_LENGTH).trimEnd() + "..." : nome;

export const Header = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <header className="bg-linear-to-r from-[#5714d7] to-[#7929c8] text-white px-6 py-4 flex items-center justify-between">
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold italic">
          <Image src="/img/logo-mcecelulares.png" className="w-[180px] h-auto" alt="Logo" width={1365} height={503} priority />
        </Link>
      </div>

      <nav className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          Início <Icon name="faHouse" className="w-4" size="lg" />
        </Link>
        <Link href="/produtos" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          Produtos <Icon name="faMobileScreen" className="w-4" size="lg" />
        </Link>
        {isAuthenticated && (
          <>
            <Link href="/carrinho" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              Carrinho <Icon name="faCartShopping" className="w-4" size="lg" />
            </Link>
            <Link href="/pedidos" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              Pedidos <Icon name="faBox" className="w-4" size="lg" />
            </Link>
          </>
        )}
        <Link href="/contato" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          Contato <Icon name="faPhone" className="w-4" size="lg" />
        </Link>
      </nav>

      <div className="flex-1 flex justify-end items-center gap-2">
        {isLoading ? (
          <div className="w-32 h-10" />
        ) : isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link href="/conta" className="flex items-center gap-2 transition-transform group hover:text-gray-200">
              <span className="text-sm font-medium">
                {user?.nome ? formatNome(user.nome) : "Conta"}
              </span>
              <Icon name="faCircleUser" className="w-5 text-white group-hover:text-gray-200" size="2xl" />
            </Link>

            <LogoutButton />
            {user?.admin && <Link href="/admin" className="flex items-center gap-2 transition-transform group hover:text-gray-200">
              <span className="text-sm font-medium">
              </span>
              <Icon name="faUsersGear" className="w-5 text-white group-hover:text-gray-200" size="xl" />
            </Link>}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="border-2 border-white bg-white text-[#7929c8] px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#7929c8] hover:text-white transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="border-2 border-white text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-white hover:text-[#7929c8] transition-all"
            >
              Cadastrar
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};