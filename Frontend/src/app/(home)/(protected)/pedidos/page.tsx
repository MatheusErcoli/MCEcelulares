'use client';

import { Icon } from '@/src/components/layout/Icon';
import { PedidoPagination } from './components/PedidoPagination';

const Pedidos = () => {
  return (
    <main className="min-h-screen md:p-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">

        <h1 className="text-4xl font-bold">Meus Pedidos</h1>

        <section className="bg-gray-200 rounded-[40px] p-10 flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
            <Icon name="faBoxOpen" className="text-purple-700" />
            Histórico de pedidos
          </h2>

          <PedidoPagination />
        </section>

      </div>
    </main>
  );
};

export default Pedidos;