import { requireAuth } from '@/lib/api/authGuard';
import { redirect } from 'next/navigation';
import Sidebar from '../../../features/admin/Sidebar';

// Define the props for Layout component
interface LayoutProps {
  children: React.ReactNode; // `children` will be the content inside the layout
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const profile = await requireAuth();

  console.log(profile, profile.data.role);

  if (!profile || profile.data.role !== 'admin') {
    // If somehow unauthenticated here (edge case), redirect to login
    redirect('/admin/login');
  }
  return (
    <div className='flex w-full min-h-screen'>
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default Layout;
