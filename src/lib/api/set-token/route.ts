import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
	const { token } = await req.json();

	// Save token in HttpOnly cookie
	(
		await // Save token in HttpOnly cookie
		cookies()
	).set({
		name: 'auth_token',
		value: token,
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: 60 * 60 * 24, // 1 day
	});

	return NextResponse.json({ success: true });
}
