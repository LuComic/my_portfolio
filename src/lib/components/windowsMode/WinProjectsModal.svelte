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
	class="xp-window xp-font absolute flex h-[400px] min-h-[300px] w-[500px] max-w-[500px] flex-col"
	style="left: {left}px; top: {top}px; z-index: {zIndex};"
>
	<div class="xp-titlebar">
		<p class="xp-title">Projects</p>
		<button onclick={closeProjects} class="xp-close-btn">✕</button>
	</div>
	<div class="xp-window-body flex w-auto flex-1 flex-col items-start justify-start overflow-scroll">
		{#each projects as proj (proj.id)}
			<button
				class="flex w-full items-center justify-between px-1 py-1 hover:bg-black/10"
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
