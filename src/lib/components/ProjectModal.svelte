<script lang="ts">
	let { project_id }: { project_id: number } = $props();
	import { SquareX } from '@lucide/svelte';
	import Carousel from './Carousel.svelte';
	import { fade } from 'svelte/transition';
	import type { project_type } from '$lib/types';
	import { projects } from '$lib/info';

	let project: project_type | undefined = projects.find((proj) => proj.id === project_id);
</script>

<div in:fade={{ duration: 150 }} class="py-4">
	<Carousel pics={project?.images} />
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
