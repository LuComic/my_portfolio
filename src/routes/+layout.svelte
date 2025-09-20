<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { projects } from '$lib/info';
	import { preloadImages, toAssetPath } from '$lib/utils/imagePreloader';

	const qportImages = ['pictures/qportBanner copy.png'];
	const imagesToPreload = Array.from(
		new Set([...projects.flatMap((p) => p.images ?? []), ...qportImages])
	);

	onMount(() => {
		preloadImages(imagesToPreload);
	});

	let { children } = $props();
</script>

<svelte:head>
	{#each imagesToPreload as img}
		<link rel="preload" as="image" href={toAssetPath(img)} />
	{/each}
</svelte:head>

{@render children()}
