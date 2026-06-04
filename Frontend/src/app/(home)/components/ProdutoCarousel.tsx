'use client'

import { ProdutoCard } from "@/src/components/produtos/ProdutoCard";
import Slider from "react-slick";
// @ts-ignore
import "slick-carousel/slick/slick.css";
// @ts-ignore
import "slick-carousel/slick/slick-theme.css";
import { useGetProdutos } from "@/src/hooks/produto/useGetProdutos";
import { useEffect } from "react";
import { Icon } from "@/src/components/layout/Icon";

type ProdutoCarouselProps = {
    destaque?: boolean
}

export const ProdutoCarousel = ({ destaque }: ProdutoCarouselProps) => {
    const { execute, produtos, loading, error } = useGetProdutos();

    useEffect(() => {
        execute(undefined, undefined, undefined, destaque, true);
    }, [execute, destaque]);

    const settings = {
        dots: true, // Mantém os dots ativos por padrão (para 4, 3 e 2 itens)
        infinite: produtos.length > 1,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 640, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    return (
        <div className="w-full max-w-7xl m-auto px-6 md:px-12 pb-15">
            {loading && (
                <p className="text-center font-medium text-gray-400 animate-pulse">
                    Carregando produtos...
                </p>
            )}

            {error && (
                <p className="text-center font-medium text-red-600 animate-pulse">
                    {error}
                </p>
            )}

            {!loading && !error && produtos.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                    <Icon name="faMobileScreen" />
                    <p className="text-sm font-medium">Nenhum produto encontrado.</p>
                </div>
            )}

            {!loading && !error && produtos.length > 0 && (
                <div className="m-0 p-0">
                    <Slider {...settings}>
                        {produtos.map((p) => (
                            <ProdutoCard key={p.id_produto} produto={p} />
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
};