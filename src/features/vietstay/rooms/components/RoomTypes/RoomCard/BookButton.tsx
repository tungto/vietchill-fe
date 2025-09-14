'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';

interface BookButtonProps {
	onBook?: () => void;
	id?: number;
}

export default function BookButton({ onBook, id }: BookButtonProps) {
	const buttonStyles =
		'rounded-lg normal-case px-4 py-2 text-white font-medium bg-[#0f4c4c] hover:bg-[#121828] transition-colors duration-300 shadow-md';

	if (id) {
		return (
			<Link href={`/vietstay/rooms/${id}`} className={buttonStyles}>
				Book Now
			</Link>
		);
	}

	return (
		<Button onClick={onBook} className={buttonStyles}>
			Book Now
		</Button>
	);
}
