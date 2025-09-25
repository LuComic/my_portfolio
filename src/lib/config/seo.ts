export const SITE_NAME = 'Lukas Jääger — Front-end Developer';
export const SITE_DESCRIPTION =
	'Front-end developer portfolio featuring projects, blog updates, and ways to get in touch with Lukas Jääger.';

const FALLBACK_SITE_URL = 'http://localhost:5173';

const rawSiteUrl = import.meta.env.VITE_PUBLIC_SITE_URL;

export const SITE_URL = rawSiteUrl && rawSiteUrl.length > 0 ? rawSiteUrl : FALLBACK_SITE_URL;

export const SITE_THEME_COLOR = '#0b0b0f';
export const SITE_SOCIAL_IMAGE_PATH = '/pictures/qport_homepage.png';
export const SITE_SOCIAL_IMAGE = `${SITE_URL}${SITE_SOCIAL_IMAGE_PATH}`;

export const TWITTER_CARD_TYPE = 'summary_large_image';

export function resolveCanonical(path?: string | null) {
	if (!path) return SITE_URL;
	if (path.startsWith('http://') || path.startsWith('https://')) return path;
	if (path.startsWith('/')) return `${SITE_URL}${path}`;
	return `${SITE_URL}/${path}`;
}
