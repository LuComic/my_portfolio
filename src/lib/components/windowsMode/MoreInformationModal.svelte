<script lang="ts">
	import type { footer_type } from '$lib/types';

	const {
		closeFooter,
		footer,
		modalOrder,
		bringModalToFront
	}: {
		closeFooter: () => void;
		footer: footer_type[];
		modalOrder: string[];
		bringModalToFront: (modalName: string) => void;
	} = $props();

	// Calculate position based on this modal's position in the stack
	const modalIndex = $derived(modalOrder.indexOf('information'));
	let left = $state(100 + modalIndex * 20);
	let top = $state(100 + modalIndex * 20);
	const zIndex = $derived(40 + modalIndex * 10);

	let moving = false;

	function onmousedown() {
		moving = true;
		bringModalToFront('information');
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
	class="absolute flex h-auto min-h-[160px] w-[560px] max-w-[500px] flex-col items-start justify-start rounded-md border-t-2 border-t-[#9cbbf3] bg-[#1B5CD8] px-1 pb-1 shadow-lg"
	style="left: {left}px; top: {top}px; z-index: {zIndex};"
>
	<div class="flex w-full items-center justify-between px-1 py-1">
		<p class="font-bold">More information</p>
		<button
			onclick={closeFooter}
			class="h-6 w-6 border border-white bg-[#EE715E] text-white hover:bg-[#ca5f4e]">X</button
		>
	</div>
	<div class="flex w-full flex-1 items-start justify-start rounded-md bg-white p-2 text-black">
		{footer[0]?.footer_text}
	</div>
</div>
