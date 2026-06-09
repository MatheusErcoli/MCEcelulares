"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { Icon } from "./Icon";
import { LogoutButton } from "./LogoutButton";

const MAX_NOME_LENGTH = 12;

const formatNome = (nome: string) =>
  nome.length > MAX_NOME_LENGTH ? nome.slice(0, MAX_NOME_LENGTH).trimEnd() + "..." : nome;

export const Header = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-linear-to-r from-[#5714d7] to-[#7929c8] text-white px-6 py-4 flex items-center justify-between relative">
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold italic">
          <Image
            src="/img/logo-mcecelulares.png"
            className="w-[140px] min-[873px]:w-[180px] h-auto"
            alt="Logo"
            width={1365}
            height={503}
            priority
          />
        </Link>
      </div>

      <nav className="hidden min-[873px]:flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Icon name="faHouse" className="w-4" size="lg" /> Início
        </Link>
        <Link href="/produtos" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Icon name="faMobileScreen" className="w-4" size="lg" /> Produtos
        </Link>
        {isAuthenticated && (
          <>
            <Link href="/carrinho" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Icon name="faCartShopping" className="w-4" size="lg" /> Carrinho
            </Link>
            <Link href="/pedidos" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Icon name="faBox" className="w-4" size="lg" /> Pedidos
            </Link>
          </>
        )}
        <Link href="/contato" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Icon name="faPhone" className="w-4" size="lg" /> Contato
        </Link>
      </nav>

      <div className="hidden min-[873px]:flex flex-1 justify-end items-center gap-2 pl-6">
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
            {user?.admin && (
              <Link href="/admin" className="flex items-center gap-2 transition-transform group hover:text-gray-200">
                <Icon name="faUsersGear" className="w-5 text-white group-hover:text-gray-200" size="xl" />
              </Link>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="border-2 border-white bg-white text-[#7929c8] px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#7929c8] hover:text-white transition-colors"
              data-testid="login-button"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="border-2 border-white text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-white hover:text-[#7929c8] transition-all"
              data-testid="signup-button"
            >
              Cadastrar
            </Link>
          </div>
        )}
      </div>

      <button
        className="min-[873px]:hidden flex items-center justify-center p-2 rounded-md hover:opacity-80 transition-opacity"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Abrir menu"
      >
        <Icon name={menuOpen ? "faXmark" : "faBars"} size="xl" />
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#6a1fd0] flex flex-col gap-0 z-50 shadow-lg min-[873px]:hidden">
          {[
            { href: "/", icon: "faHouse", label: "Início" },
            { href: "/produtos", icon: "faMobileScreen", label: "Produtos" },
            ...(isAuthenticated
              ? [
                  { href: "/carrinho", icon: "faCartShopping", label: "Carrinho" },
                  { href: "/pedidos", icon: "faBox", label: "Pedidos" },
                ]
              : []),
            { href: "/contato", icon: "faPhone", label: "Contato" },
          ].map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-6 py-4 hover:bg-[#5714d7] transition-colors border-b border-white/10 text-sm font-medium"
            >
              <Icon name={icon as any} size="lg" />
              {label}
            </Link>
          ))}

          <div className="px-6 py-4">
            {isLoading ? (
              <div className="h-10" />
            ) : isAuthenticated ? (
              <div className="flex items-center justify-between">
                <Link
                  href="/conta"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 hover:text-gray-200 transition-colors"
                >
                  <Icon name="faCircleUser" size="xl" />
                  <span className="text-sm font-medium">
                    {user?.nome ? formatNome(user.nome) : "Conta"}
                  </span>
                </Link>
                <div className="flex items-center gap-3">
                  {user?.admin && (
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-gray-200 transition-colors"
                    >
                      <Icon name="faUsersGear" size="xl" />
                    </Link>
                  )}
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center border-2 border-white bg-white text-[#7929c8] px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#7929c8] hover:text-white transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center border-2 border-white text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-white hover:text-[#7929c8] transition-all"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};