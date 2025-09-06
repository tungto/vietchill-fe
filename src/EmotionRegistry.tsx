'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

let clientSideEmotionCache: ReturnType<typeof createCache> | null = null;

function createEmotionCache() {
	return createCache({ key: 'mui', prepend: true });
}

export default function EmotionRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	const cache = React.useMemo(() => {
		if (typeof window === 'undefined') {
			return createEmotionCache(); // fresh on server
		}
		if (!clientSideEmotionCache) {
			clientSideEmotionCache = createEmotionCache(); // reuse on client
		}
		return clientSideEmotionCache;
	}, []);

	return <CacheProvider value={cache}>{children}</CacheProvider>;
}
