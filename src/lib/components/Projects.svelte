<script lang="ts">
	let {
		closeProjects,
		id_from_projects = $bindable(),
		projects
	}: { closeProjects: () => void; id_from_projects: number; projects: project_type[] } = $props();
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import type { project_type } from '$lib/types';
</script>

<div
	class="flex h-auto max-h-[50vh] w-full flex-col items-start justify-start gap-2"
	in:fade={{ duration: 200 }}
>
	<button
		class="flex items-center justify-start gap-1 rounded-lg py-1 pr-2 pl-1 duration-125 hover:bg-zinc-950/40"
		onclick={closeProjects}
	>
		<ChevronLeft size={20} />
		<p class="text-lg">Projects</p>
	</button>
	<div class="flex h-auto w-full flex-col items-start justify-start gap-2 overflow-y-scroll">
		{#each projects as proj (proj.id)}
			<button
				class="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
				onclick={() => (id_from_projects = proj.id)}
			>
				<div class="flex flex-col items-start justify-start gap-1">
					<p class="text-violet-400">{proj?.name}</p>
					<p>{proj?.description.slice(0, 100)}...</p>
				</div>
				<ChevronRight size={18} />
			</button>
			{#if projects.indexOf(proj) !== projects.length - 1}
				<hr class="hr border-zinc-600" />
			{/if}
		{/each}
	</div>
</div>
