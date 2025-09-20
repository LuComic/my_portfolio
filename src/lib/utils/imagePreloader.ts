import { assets } from '$app/paths';

function toAssetPath(url: string): string {
	if (/^https?:\/\//i.test(url)) return url;
	const cleaned = url.startsWith('/') ? url : `/${url}`;
	const base = assets?.length ? assets : '';
	return `${base}${cleaned}`;
}

export function preloadImages(urls: string[]): Promise<void> {
	const unique = Array.from(new Set(urls)).filter(Boolean) as string[];
	if (unique.length === 0) return Promise.resolve();

	return Promise.all(
		unique.map(
			(u) =>
				new Promise<void>((resolve) => {
					const img = new Image();
					img.decoding = 'async';
					img.loading = 'eager';
					img.onload = () => resolve();
					img.onerror = () => resolve();
					img.src = toAssetPath(u);
				})
		)
	).then(() => undefined);
}

export { toAssetPath };
