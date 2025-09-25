<script lang="ts">
	import ProjectModal from '$lib/components/ProjectModal.svelte';
	import type { PageData } from './$types';
	import { SITE_NAME, SITE_SOCIAL_IMAGE, resolveCanonical } from '$lib/config/seo';

	let { data }: PageData = $props();

	const project = data.project;
	const projectId = data.project?.id ?? data.requestedId ?? null;

	const title = project?.name
		? `${project.name} — Project — ${SITE_NAME}`
		: `Project — ${SITE_NAME}`;
	const description = project?.description || 'Project details from Lukas Jääger.';
	const canonicalUrl = resolveCanonical(
		data.canonicalPath ?? (projectId !== null ? `/${projectId}` : null)
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={project?.images?.[0] ?? SITE_SOCIAL_IMAGE} />

	<script type="application/ld+json">
  	{JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'CreativeWork',
			name: project?.name,
			description,
			url: canonicalUrl
		})}
	</script>
</svelte:head>

<div class="flex h-auto min-h-screen w-screen items-center justify-center">
	<div
		class="flex h-full w-full flex-col items-start justify-start px-4 pt-8 md:w-3/4 md:pt-0 lg:w-1/2 lg:pt-0 xl:w-1/2 xl:pt-0"
	>
		{#if project}
			<ProjectModal projectId={project.id} initialProject={project} />
		{:else}
			<p class="py-16 text-center text-lg text-zinc-300">Project not found.</p>
		{/if}
	</div>
</div>
