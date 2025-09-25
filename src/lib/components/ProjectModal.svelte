<script lang="ts">
	let { projectId, initialProject }: { projectId: number; initialProject?: project_type | null } =
		$props();
	import { SquareX } from '@lucide/svelte';
	import Carousel from './Carousel.svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { loadProjects } from '$lib/supabase_data.svelte';
	import type { project_type } from '$lib/types';

	let project: project_type | null = $state(initialProject ?? null);
	let loadingError = $state('');

	onMount(async () => {
		if (project) return;

		try {
			const data = await loadProjects();
			project = data?.find((proj) => proj.id === projectId) ?? null;
			if (!project) {
				loadingError = 'Project details unavailable.';
			}
		} catch (error) {
			console.error('Failed to load project details', error);
			loadingError = 'Project details unavailable.';
		}
	});
</script>

{#if project}
	<div in:fade={{ duration: 150 }} class="py-4">
		<Carousel pics={project.images} altBase={project.name} />
		<div class="flex w-full items-center justify-between">
			<h1 class="my-4 text-xl font-medium">{project.name}</h1>
			<a class="text-red-300 duration-125 hover:text-red-400" href="/">
				<SquareX color="currentColor" />
			</a>
		</div>
		<p>{project.description}</p>
		{#if project.website}
			<a
				href={project.website}
				target="_blank"
				rel="noopener"
				class="mt-2 block w-max text-violet-400 duration-125 hover:text-violet-500"
				>{project.website}</a
			>
		{/if}
		{#if project.specifications}
			<p class="my-2 text-zinc-400">{project.specifications}</p>
		{/if}
	</div>
{:else}
	<p class="py-16 text-center text-lg text-zinc-300">
		{loadingError || 'Loading project details...'}
	</p>
{/if}
