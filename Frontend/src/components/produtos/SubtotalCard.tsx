"use client";

interface SubtotalCardProps {
  carrinho: ItemCarrinhoType[];
}

export const SubtotalCard = ({ carrinho }: SubtotalCardProps) => {
  const subtotal = carrinho.reduce(
    (acc, item) => acc + item.preco_unitario * item.quantidade,
    0
  );

  return (
    <aside className="bg-[#e5e5e5] p-8 rounded-[40px] flex flex-col gap-6 h-fit sticky top-5">

      <div className="border-t border-gray-300" />

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center text-gray-600">
          <span className="text-lg">Subtotal</span>
          <span className="font-semibold text-black">
            R$ {subtotal.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <div className="flex justify-between items-center text-gray-600">
          <span className="text-lg">Frete</span>
          <span className="font-semibold text-green-600">Grátis</span>
        </div>

        <div className="border-t border-gray-300 my-2" />

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-black">Total</span>
          <span className="text-2xl font-bold text-[#5714d7]">
            R$ {subtotal.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div>
    </aside>
  );
};