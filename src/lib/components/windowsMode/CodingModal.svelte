<script lang="ts">
	import type { coding_type } from '$lib/types';

	const {
		closeCoding,
		coding,
		modalOrder,
		bringModalToFront
	}: {
		closeCoding: () => void;
		coding: coding_type[];
		modalOrder: string[];
		bringModalToFront: (modalName: string) => void;
	} = $props();

	// Calculate position based on this modal's position in the stack
	const modalIndex = $derived(modalOrder.indexOf('coding'));
	let left = $state(100 + modalIndex * 20);
	let top = $state(100 + modalIndex * 20);
	const zIndex = $derived(40 + modalIndex * 10);

	let moving = false;

	function onmousedown() {
		moving = true;
		bringModalToFront('coding');
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
	class="xp-window xp-font absolute flex h-auto min-h-[300px] w-[500px] max-w-[500px] flex-col"
	style="left: {left}px; top: {top}px; z-index: {zIndex};"
>
	<div class="xp-titlebar">
		<p class="xp-title">Coding</p>
		<button onclick={closeCoding} class="xp-close-btn">✕</button>
	</div>
	<div class="xp-window-body flex w-auto flex-1 items-start justify-start">
		<div class="flex w-full flex-col gap-1">
			{#each coding as code (code.id)}
				<p>- {code?.description}</p>
			{/each}
		</div>
	</div>
</div>
