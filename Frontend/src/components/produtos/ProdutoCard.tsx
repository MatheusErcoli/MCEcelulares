"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { useCreateItemCarrinho } from "../../hooks/carrinho/useCreateItemCarrinho";
import { Button } from "../layout/Button";
import Image from "next/image";

interface ProdutoCardProps {
  produto: ProdutoType;
}

export const ProdutoCard = ({ produto }: ProdutoCardProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { execute, loading, error } = useCreateItemCarrinho();

  const handleAdd = async () => {
    if (!isAuthenticated) return router.push("/login");

    const res = await execute(produto.id_produto, Number(produto.preco));
    if (res.success) router.push("/carrinho");
  };

  return (
    <div className="bg-white rounded-[23px] overflow-hidden flex flex-col border-2 p-[1px] m-[10px] border-purple-800">

      <div
        onClick={() => router.push(`/produtos/detalhes?id=${produto.id_produto}`)}
        className="bg-[#E5E7EB] p-5 flex items-center justify-center relative h-[160px] bg-produto-pattern bg-repeat bg-center shrink-0 cursor-pointer overflow-hidden"
      >
        <Image
          src={produto.imagem ?? "https://placehold.co/200x200/e5e7eb/9ca3af/png?text=Sem+imagem"}
          alt={produto.nome}
          className="object-contain max-h-full max-w-[200px]"
          width={130}
          height={0}
        />
      </div>

      <div className="bg-white p-4 flex flex-col flex-grow justify-between items-center w-full">
        <div className="w-full flex flex-col items-center">
          <h3 className="text-xl font-semibold text-black text-center mt-2 leading-tight line-clamp-2 min-h-[56px] w-full">
            {produto.nome}
          </h3>
          <p className="text-lg font-semibold text-purple-800 mt-1 mb-2">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(produto.preco))}
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-xs text-center font-medium mb-2">{error}</p>
        )}

        <div className="w-full mt-auto">
          <Button
            text={loading ? "Processando..." : "Adicionar"}
            icon="faCartShopping"
            onClick={handleAdd}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};