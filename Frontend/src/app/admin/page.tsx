import { Icon } from '@/src/components/layout/Icon';
import ProdutoCount from './components/ProdutoCount';
import PedidoCount from './components/PedidoCount';
import UsuarioCount from './components/UsuarioCount';
import Revenue from './components/Revenue';
import { PedidoNew } from './components/PedidoNew';
import { BestSellers } from './components/BestSellers';
import { QuickActions } from './components/QuickActions';
import { PedidosAdmProvider } from '@/src/contexts/PedidosAdmContext';

const Admin = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">

      <div>
        <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1">Bem-vindo</p>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <PedidosAdmProvider>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <ProdutoCount />
          <PedidoCount />
          <UsuarioCount />
          <Revenue />
        </div>

        <PedidoNew />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BestSellers />
          <QuickActions />
        </div>
      </PedidosAdmProvider>

    </div>
  );
};

export default Admin;