<script lang="ts">
	import type { project_type } from '$lib/types';
	import { ChevronRight, ChevronDown } from '@lucide/svelte';

	const {
		closeProjects,
		projects,
		modalOrder,
		bringModalToFront
	}: {
		closeProjects: () => void;
		projects: project_type[];
		modalOrder: string[];
		bringModalToFront: (modalName: string) => void;
	} = $props();

	// Calculate position based on this modal's position in the stack
	const modalIndex = $derived(modalOrder.indexOf('projects'));
	let left = $state(100 + modalIndex * 20);
	let top = $state(100 + modalIndex * 20);
	const zIndex = $derived(40 + modalIndex * 10);

	let moving = false;

	function onmousedown() {
		moving = true;
		bringModalToFront('projects');
	}

	function onmousemove(e: any) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}

	function onmouseup() {
		moving = false;
	}

	// Accordion
	let openProjects = $state(new Set<number>());

	const toggleProj = (projectId: number) => {
		if (openProjects.has(projectId)) {
			openProjects.delete(projectId);
		} else {
			openProjects.add(projectId);
		}
		// Trigger reactivity
		openProjects = new Set(openProjects);
	};
</script>

<svelte:window {onmouseup} {onmousemove} />

<div
	{onmousedown}
	role="dialog"
	tabindex="-1"
	class="absolute flex h-auto max-h-[500px] min-h-[300px] w-[500px] max-w-[500px] flex-col items-start justify-start overflow-scroll rounded-md border-t-2 border-t-[#9cbbf3] bg-[#1B5CD8] px-1 pb-1 shadow-lg"
	style="left: {left}px; top: {top}px; z-index: {zIndex};"
>
	<div class="flex w-full items-center justify-between px-1 py-1">
		<p class="font-bold">Projects</p>
		<button
			onclick={closeProjects}
			class="h-6 w-6 border border-white bg-[#EE715E] text-white hover:bg-[#ca5f4e]">X</button
		>
	</div>
	<div
		class="flex w-full flex-1 flex-col items-start justify-start rounded-md bg-white p-2 text-black"
	>
		{#each projects as proj (proj.id)}
			<button
				class="flex w-full items-center justify-between px-1 hover:bg-black/10"
				onclick={() => toggleProj(proj.id)}
			>
				{proj.name}
				{#if openProjects.has(proj.id)}
					<ChevronDown />
				{:else}
					<ChevronRight />
				{/if}
			</button>
			{#if openProjects.has(proj.id)}
				<ul class="px-1 py-2 text-sm">
					<li>{proj.description}</li>
					<li>{proj.specifications}</li>
					<li>
						<a href={proj.website} class="text-blue-700 visited:text-violet-700">{proj.website}</a>
					</li>
				</ul>
			{/if}
		{/each}
	</div>
</div>
