<script lang="ts">
	let {
		closeProjects,
		chosenProject = $bindable()
	}: { closeProjects: () => void; chosenProject: string } = $props();
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	let noorteKunstActive = $state(false);
	let streamListActive = $state(false);
	let termnotesActive = $state(false);
	let terminalportActive = $state(false);
	let catMemeGenActive = $state(false);
	let niceUtilAcitve = $state(false);

	const closeNoorteKunst = () => {
		noorteKunstActive = false;
	};
	const closeNiceUtil = () => {
		niceUtilAcitve = false;
	};
	const closeStreamList = () => {
		streamListActive = false;
	};
	const closeTermnotes = () => {
		termnotesActive = false;
	};
	const closeTerminalPort = () => {
		terminalportActive = false;
	};
	const closeCatMemeGen = () => {
		catMemeGenActive = false;
	};
</script>

<!-- {#snippet project(project: string)}
	<button
		class="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
    onclick={}
	>
		<div class="flex items-center justify-start gap-1">
			<p class="font-bold text-violet-400">{project}</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis porro enim libero quidem
				sequi commodi. Labore incidunt consectetur impedit culpa.
			</p>
		</div>
		<ChevronRight size={18} />
	</button>
{/snippet} -->

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
		<button
			class="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
			onclick={() => (chosenProject = 'noorteKunst')}
		>
			<div class="flex flex-col items-start justify-start gap-1">
				<p class="text-violet-400">noorteKunst</p>
				<p>art gallery/social media for starting artists...</p>
			</div>
			<ChevronRight size={18} />
		</button>
		<hr class="hr border-zinc-600" />
		<button
			class="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
			onclick={() => (streamListActive = true)}
		>
			<div class="flex flex-col items-start justify-start gap-1">
				<p class="text-violet-400">StreamList</p>
				<p>similar to Letterboxd, but better...</p>
			</div>
			<ChevronRight size={18} />
		</button>
		<hr class="hr border-zinc-600" />
		<button
			class="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
			onclick={() => (termnotesActive = true)}
		>
			<div class="flex flex-col items-start justify-start gap-1">
				<p class="text-violet-400">termnotes</p>
				<p>note taking app in the terminal...</p>
			</div>
			<ChevronRight size={18} />
		</button>
		<hr class="hr border-zinc-600" />
		<button
			class="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
			onclick={() => (catMemeGenActive = true)}
		>
			<div class="flex flex-col items-start justify-start gap-1">
				<p class="text-violet-400">Cat meme generator</p>
				<p>a basic cat meme generator...</p>
			</div>
			<ChevronRight size={18} />
		</button>
		<hr class="hr border-zinc-600" />
		<button
			class="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
			onclick={() => (terminalportActive = true)}
		>
			<div class="flex flex-col items-start justify-start gap-1">
				<p class="text-violet-400">terminalport</p>
				<p>a simple portfolio in the terminal...</p>
			</div>
			<ChevronRight size={18} />
		</button>
		<hr class="hr border-zinc-600" />
		<button
			class="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
			onclick={() => (niceUtilAcitve = true)}
		>
			<div class="flex flex-col items-start justify-start gap-1">
				<p class="text-violet-400">NiceUtil</p>
				<p>a Mac utility app...</p>
			</div>
			<ChevronRight size={18} />
		</button>
	</div>
</div>
