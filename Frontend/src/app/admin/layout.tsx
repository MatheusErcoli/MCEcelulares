import { AdminRoute } from '../../components/guards/AdminRoute';
import { AdminSidebar } from './components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRoute>
      <div className="flex min-h-screen bg-[url('/img/adm-background.png')] bg-fixed bg-top bg-repeat-y bg-[size:100%_auto]">
        <AdminSidebar />
        <main className="flex-1 p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </AdminRoute>
  );
}