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
	class="xp-window xp-font absolute flex h-auto min-h-[160px] w-[560px] max-w-[560px] flex-col"
	style="left: {left}px; top: {top}px; z-index: {zIndex};"
>
	<div class="xp-titlebar">
		<p class="xp-title">More information</p>
		<button onclick={closeFooter} class="xp-close-btn">✕</button>
	</div>
	<div class="xp-window-body flex w-auto flex-1 items-start justify-start">
		{footer[0]?.footer_text}
	</div>
</div>
