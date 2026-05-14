'use client'

import { Button } from "@/src/components/layout/Button";
import { useRouter } from "next/navigation";

type CategoriaProps = {
    id: number;
    name: string;
}

export const CategoriaCard = ({ id, name }: CategoriaProps) => {
    const router = useRouter();

    const handleClick = () => {
            router.push(`/produtos?id_categoria=${id}`);
    };

    return (
        <Button
            text={name}
            onClick={handleClick}
            className="flex gap-5 m-[7px] mt-[50px] px-[20px] flex-col font-semibold items-center justify-center w-41 h-40 rounded-[30px] shadow-sm transition-colors text-gray-700 text-2xl bg-[#E5E7EB] hover:bg-gray-300"
        />
    );
}