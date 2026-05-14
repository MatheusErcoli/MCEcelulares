'use client';

import { Icon } from '@/src/components/layout/Icon';

export const QuickActions = () => {
  return (
    <section className="bg-gray-200 rounded-[32px] p-8 flex flex-col gap-5">
      <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
        <Icon name="faGear" className="text-purple-700" />
        Ações Rápidas
      </h2>

      <div className="flex flex-col gap-3">
        <a href="/admin/produtos/cadastro" className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 font-semibold text-sm text-gray-800 hover:text-purple-700 hover:shadow-md transition-all group">
          <span className="text-purple-700 bg-purple-100 p-2 rounded-xl group-hover:bg-purple-700 group-hover:text-white transition-colors">
            <Icon name="faPlus" />
          </span>
          Adicionar Produto
        </a>

        <a href="/admin/categorias/cadastro" className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 font-semibold text-sm text-gray-800 hover:text-purple-700 hover:shadow-md transition-all group">
          <span className="text-purple-700 bg-purple-100 p-2 rounded-xl group-hover:bg-purple-700 group-hover:text-white transition-colors">
            <Icon name="faTag" />
          </span>
          Nova Categoria
        </a>

        <a href="/admin/pedidos" className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 font-semibold text-sm text-gray-800 hover:text-purple-700 hover:shadow-md transition-all group">
          <span className="text-purple-700 bg-purple-100 p-2 rounded-xl group-hover:bg-purple-700 group-hover:text-white transition-colors">
            <Icon name="faBox" />
          </span>
          Gerenciar Pedidos
        </a>

        <a href="/admin/usuarios" className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 font-semibold text-sm text-gray-800 hover:text-purple-700 hover:shadow-md transition-all group">
          <span className="text-purple-700 bg-purple-100 p-2 rounded-xl group-hover:bg-purple-700 group-hover:text-white transition-colors">
            <Icon name="faUsers" />
          </span>
          Ver Usuários
        </a>
      </div>
    </section>
  );
};