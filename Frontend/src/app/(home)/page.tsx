import { CategoriaList } from "./components/CategoriaList";
import { ProdutoDestaque } from "./components/ProdutoDestaque";
import { ProdutoNew } from "./components/ProdutoNew";

export default async function Home() {
    return (
        <>
            <CategoriaList/>
            <ProdutoDestaque title="Destaques" />
            <ProdutoNew title="Novos produtos" />
        </>
    );
}