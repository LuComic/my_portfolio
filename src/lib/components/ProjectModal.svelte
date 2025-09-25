<script lang="ts">
	let { project_id, initialProject }: { project_id: number; initialProject?: project_type | null } =
		$props();
	import { SquareX } from '@lucide/svelte';
	import Carousel from './Carousel.svelte';
	import { fade } from 'svelte/transition';
	import { Progress } from '@skeletonlabs/skeleton-svelte';
	import { loadProjects } from '$lib/supabase_data.svelte';
	import type { project_type } from '$lib/types';

	let projects: project_type[] = $state([]);
	let project: project_type | undefined = $state(initialProject ?? undefined);
	let loading = $state(!initialProject);
	let loadingProgress = $state(0);
	let imagesLoaded = $state(false);

	async function getData() {
		if (initialProject) {
			project = initialProject ?? undefined;
			if (initialProject?.images && initialProject.images.length > 0) {
				await preloadImages(initialProject.images);
			}
			loadingProgress = 100;
			imagesLoaded = true;
			loading = false;
			return;
		}

		loading = true;
		loadingProgress = 0;
		imagesLoaded = false;

		const data = await loadProjects();
		projects = data;
		loadingProgress = 50;

		const currentProject = projects?.find((proj) => proj.id === project_id);
		project = currentProject;

		if (currentProject?.images && currentProject.images.length > 0) {
			await preloadImages(currentProject.images);
		}

		loadingProgress = 100;
		imagesLoaded = true;
		loading = false;
	}

	// Preload images function
	async function preloadImages(imageUrls: string[]) {
		const imagePromises = imageUrls.map((url) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = resolve;
				img.onerror = resolve; // Resolve even on error to not block loading
				img.src = url;
			});
		});

		await Promise.all(imagePromises);
	}
	getData();
</script>

{#if loading || !imagesLoaded}
	<div class="w-full py-4">
		<Progress value={loadingProgress} max={100} meterBg="bg-violet-400" />
	</div>
{:else}
	<div in:fade={{ duration: 150 }} class="py-4">
		<Carousel pics={project?.images} altBase={project?.name} />
		<div class="flex w-full items-center justify-between">
			<h1 class="my-4 text-xl font-medium">{project?.name}</h1>
			<a class="text-red-300 duration-125 hover:text-red-400" href="/">
				<SquareX color="currentColor" />
			</a>
		</div>
		<p>
			{project?.description}
		</p>
		<a
			href={project?.website}
			target="_blank"
			class="mt-2 block w-max text-violet-400 duration-125 hover:text-violet-500"
			>{project?.website}</a
		>
		<p class="my-2 text-zinc-400">{project?.specifications}</p>
	</div>
{/if}
