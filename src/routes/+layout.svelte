<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import {
		SITE_DESCRIPTION,
		SITE_NAME,
		SITE_SOCIAL_IMAGE,
		SITE_THEME_COLOR,
		SITE_URL,
		TWITTER_CARD_TYPE,
		resolveCanonical
	} from '$lib/config/seo';

	let { children } = $props();

	const defaultTitle = SITE_NAME;
	const defaultDescription = SITE_DESCRIPTION;
	const canonicalUrl = $derived(resolveCanonical(page.url?.pathname || '/'));
</script>

<svelte:head>
	<title>{defaultTitle}</title>
	<meta name="description" content={defaultDescription} />
	<link rel="canonical" href={canonicalUrl} />

	<meta name="theme-color" content={SITE_THEME_COLOR} />
	<meta name="color-scheme" content="dark light" />

	<meta property="og:site_name" content={defaultTitle} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={defaultTitle} />
	<meta property="og:description" content={defaultDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={SITE_SOCIAL_IMAGE} />
	<meta property="og:image:alt" content="Lukas Jääger portfolio preview" />

	<meta name="twitter:card" content={TWITTER_CARD_TYPE} />
	<meta name="twitter:title" content={defaultTitle} />
	<meta name="twitter:description" content={defaultDescription} />
	<meta name="twitter:image" content={SITE_SOCIAL_IMAGE} />

	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
</svelte:head>

{@render children()}
