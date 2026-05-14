import { EnderecoSelector } from "./components/EnderecoSelector";

const Checkout = () => {
  return (
    <main className="min-h-screen md:p-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        <h1 className="text-4xl font-bold">Finalizar Pedido</h1>

        <EnderecoSelector />

      </div>
    </main>
  );
};

export default Checkout;