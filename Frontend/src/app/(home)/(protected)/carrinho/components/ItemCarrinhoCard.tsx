'use client'

import { Button } from "@/src/components/layout/Button";
import { useDeleteItemCarrinho } from "@/src/hooks/carrinho/useDeleteItemCarrinho";
import { useUpdateItemCarrinho } from "@/src/hooks/carrinho/useUpdateItemCarrinho";
import Image from "next/image";

interface CartItemCardProps {
    item: ItemCarrinhoType;
    onUpdate: () => void;
}

export const ItemCarrinhoCard = ({ item, onUpdate }: CartItemCardProps) => {
    const { execute: update, loading: alterando } = useUpdateItemCarrinho();
    const { execute: remove, loading: removendo } = useDeleteItemCarrinho();

    return (
        <div className="bg-white p-4 rounded-[50px] text-xl flex items-center justify-between shadow-sm border border-gray-100 max-w-4xl">

            <div className="flex items-center gap-6">
                <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
                    <Image
                        src={item.produto.imagem ?? 'https://placehold.co/200x200/e5e7eb/9ca3af/png?text=Sem+imagem'}
                        alt={item.produto.nome}
                        className="w-full h-full object-contain"
                        width={100}
                        height={0}
                    />
                </div>

                <h2 className="text-lg font-bold text-black">
                    {item.produto?.nome || "Produto"}
                </h2>
            </div>

            <div className="flex items-center gap-8">


                <div className="flex items-center gap-4">
                    <Button
                        icon="faPlus"
                        className="text-[#5714d7] hover:opacity-75 transition-opacity disabled:opacity-50"
                        onClick={() => update(item.id_item_carrinho, 1).then(res => res.success && onUpdate())}
                        disabled={alterando}
                    />
                    <span className="font-bold text-black">
                        {item.quantidade}
                    </span>
                    <Button
                        icon="faMinus" className={item.quantidade > 1 ? "text-[#5714d7] hover:opacity-75 disabled:opacity-1" : "text-gray-400"}
                        onClick={() => update(item.id_item_carrinho, -1).then(res => res.success && onUpdate())}
                        disabled={alterando || item.quantidade <= 1}
                    />
                </div>

                <div className="font-bold text-[#5714d7]">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.produto.preco))}
                </div>
                <Button
                    icon="faTrash"
                    className="text-[#ff5c8a] hover:opacity-75 transition-opacity"
                    onClick={() => remove(item.id_item_carrinho).then(res => res.success && onUpdate())}

                    disabled={removendo}
                />
            </div>
        </div>
    );
};