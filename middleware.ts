import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Dummy function to simulate extracting profile from token/cookies
async function getProfileFromToken(token?: string) {
	if (!token) return null;

	// Example: fetch profile or decode token here
	if (token === 'admin-token') {
		return { role: 'admin', name: 'Admin User' };
	}
	if (token === 'user-token') {
		return { role: 'user', name: 'Regular User' };
	}
	return null;
}

export async function middleware(request: NextRequest) {
	console.log('✅ Middleware triggered:', request.nextUrl.pathname);

	const token = request.cookies.get('token')?.value;
	const profile = await getProfileFromToken(token);
	const url = request.nextUrl.clone();

	console.log('url============', url);

	// ✅ Redirect /vietstay to /
	if (url.pathname === '/vietstay') {
		url.pathname = '/';
		return NextResponse.redirect(url);
	}

	// ✅ Admin route protection
	if (url.pathname.startsWith('/admin')) {
		if (!profile || profile.role !== 'admin') {
			url.pathname = '/unauthorized';
			return NextResponse.redirect(url);
		}
	}

	// ✅ User route protection
	else if (url.pathname.startsWith('/user')) {
		if (!profile || profile.role !== 'user') {
			url.pathname = '/unauthorized';
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}

// ✅ Update matcher to include /vietstay
export const config = {
	matcher: [
		'/admin/:path*',
		'/user/:path*',
		'/protected/:path*',
		'/vietstay',
		'/vietstay/:path*', // include subpaths too
	],
};
