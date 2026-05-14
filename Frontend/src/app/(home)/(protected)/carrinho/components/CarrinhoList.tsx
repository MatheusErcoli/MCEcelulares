"use client";

import { useEffect } from "react";
import { useGetCarrinho } from "@/src/hooks/carrinho/useGetCarrinho";
import { ItemCarrinhoCard } from "./ItemCarrinhoCard";
import { SubtotalCard } from "../../../../../components/produtos/SubtotalCard";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/layout/Button";

export const CarrinhoList = () => {
  const { execute: fetchCarrinho, loading, carrinho } = useGetCarrinho();
  const router = useRouter();

  const handleClick = () => {
    router.push("/carrinho/checkout");
  };

  useEffect(() => { fetchCarrinho() }, [fetchCarrinho]);

  if (loading && carrinho.length === 0) {
    return <p className="text-center text-gray-500 py-10">Carregando sua sacola...</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 flex flex-col gap-5">
        {carrinho.length === 0 ? (
          <div className="bg-white p-16 rounded-[40px] text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-xl font-semibold">
              Seu carrinho está vazio.
            </p>
          </div>
        ) : (
          carrinho.map((item) => (
            <ItemCarrinhoCard
              key={item.id_item_carrinho}
              item={item}
              onUpdate={fetchCarrinho}
            />
          ))
        )}
      </div>

      <div className="flex flex-col gap-4">
        <SubtotalCard carrinho={carrinho} />
        <Button
          text="Finalizar pedido"
          icon="faCircleCheck"
          onClick={handleClick}
          disabled={loading || carrinho.length === 0}
        />
      </div>
    </div>
  );
};