<script lang="ts">
	import type { experiences_type } from '$lib/types';

	const {
		closeExperiences,
		experiences,
		modalOrder,
		bringModalToFront
	}: {
		closeExperiences: () => void;
		experiences: experiences_type[];
		modalOrder: string[];
		bringModalToFront: (modalName: string) => void;
	} = $props();

	// Calculate position based on this modal's position in the stack
	const modalIndex = $derived(modalOrder.indexOf('experiences'));
	let left = $state(100 + modalIndex * 20);
	let top = $state(100 + modalIndex * 20);
	const zIndex = $derived(40 + modalIndex * 10);

	let moving = false;

	function onmousedown() {
		moving = true;
		bringModalToFront('experiences');
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
</script>

<svelte:window {onmouseup} {onmousemove} />

<div
	{onmousedown}
	role="dialog"
	tabindex="-1"
	class="absolute flex h-auto min-h-[300px] w-[500px] max-w-[500px] flex-col items-start justify-start rounded-md border-t-2 border-t-[#9cbbf3] bg-[#1B5CD8] px-1 pb-1 shadow-lg"
	style="left: {left}px; top: {top}px; z-index: {zIndex};"
>
	<div class="flex w-full items-center justify-between px-1 py-1">
		<p class="font-bold">Experiences</p>
		<button
			onclick={closeExperiences}
			class="h-6 w-6 border border-white bg-[#EE715E] text-white hover:bg-[#ca5f4e]">X</button
		>
	</div>
	<div class="flex w-full flex-1 items-start justify-start rounded-md bg-white p-2 text-black">
		<div class="flex w-full flex-col gap-1">
			{#each experiences as exp (exp.id)}
				<p>- {exp?.description}</p>
			{/each}
		</div>
	</div>
</div>
