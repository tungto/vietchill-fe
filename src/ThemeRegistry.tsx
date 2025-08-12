'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import createEmotionCache from './createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
	typography: {
		fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
	},
});

export default function ThemeRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<CacheProvider value={clientSideEmotionCache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</CacheProvider>
	);
}
