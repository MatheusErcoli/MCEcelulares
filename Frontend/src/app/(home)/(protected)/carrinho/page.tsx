import { CarrinhoList } from "./components/CarrinhoList";

const Carrinho = () => {
    return (
        <main className="min-h-screen md:p-12">
            <div className="max-w-7xl mx-auto">
                
                <h1 className="text-4xl font-bold mb-10">Meu Carrinho</h1>

                <CarrinhoList />
            </div>
        </main>
    );
};

export default Carrinho;