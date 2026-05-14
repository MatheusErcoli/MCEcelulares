'use client';

import { ProdutoCarousel } from "./ProdutoCarousel";

type ProdutoNewProps = {
    title: string;
}

export const ProdutoNew = ({ title }: ProdutoNewProps) => {

    return (
        <>
            <h2 className="font-bold font text-4xl m-[20px] pl-40">{title}</h2>
            <ProdutoCarousel />
        </>
    );
};