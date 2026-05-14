'use client';

import { ProdutoCarousel } from "./ProdutoCarousel";

type ProdutoDestaqueProps = {
    title: string;
}

export const ProdutoDestaque = ({ title }: ProdutoDestaqueProps) => {

    return (
        <>
            <h2 className="font-bold font text-4xl m-[20px] pl-40">{title}</h2>
            <ProdutoCarousel destaque={true} />
        </>
    );
};