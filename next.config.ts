import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		optimizeCss: true, // enabling this will enable SSR for Tailwind
	},
};

export default nextConfig;
