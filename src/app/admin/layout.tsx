'use client'; // Mark this file as a Client Component

import { usePathname } from 'next/navigation'; // Import usePathname for App Router
import Sidebar from './Sidebar';

// Define the props for Layout component
interface LayoutProps {
	children: React.ReactNode; // `children` will be the content inside the layout
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const pathname = usePathname(); // Get the current pathname using usePathname()

	return (
		<div className='flex min-h-screen'>
			<Sidebar pathname={pathname}>{children}</Sidebar>
		</div>
	);
};

export default Layout;
