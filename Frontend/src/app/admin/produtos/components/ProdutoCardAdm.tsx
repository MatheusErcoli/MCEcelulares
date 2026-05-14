"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProdutoCardAdmProps {
  produto: ProdutoType;
}

export const ProdutoCardAdm = ({ produto }: ProdutoCardAdmProps) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-[23px] overflow-hidden flex flex-col border-2 p-[1px] m-[10px] border-purple-800">

      <div
        onClick={() => router.push(`/admin/produtos/edicao?id=${produto.id_produto}`)}
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
          <h3 className="text-md font-semibold text-black text-center mt-2 leading-tight line-clamp-2 min-h-[56px] w-full">
            {produto.nome}
          </h3>
          <p className="text-md font-semibold text-purple-800 mt-1 mb-2">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(produto.preco))}
          </p>
        </div>

      </div>
    </div>
  );
};