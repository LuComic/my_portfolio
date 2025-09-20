<script lang="ts">
	import type { personal_type } from '$lib/types';

	const {
		closeBio,
		bio,
		modalOrder,
		bringModalToFront
	}: {
		closeBio: () => void;
		bio: personal_type[];
		modalOrder: string[];
		bringModalToFront: (modalName: string) => void;
	} = $props();

	// Calculate position based on this modal's position in the stack
	const modalIndex = $derived(modalOrder.indexOf('bio'));
	let left = $state(100 + modalIndex * 20);
	let top = $state(100 + modalIndex * 20);
	const zIndex = $derived(40 + modalIndex * 10);

	let moving = false;

	function onmousedown() {
		moving = true;
		bringModalToFront('bio');
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
		<p class="xp-title">Bio</p>
		<button onclick={closeBio} class="xp-close-btn">✕</button>
	</div>
	<div class="xp-window-body flex w-auto flex-1 items-start justify-start">
		{bio[0]?.bio_text}
	</div>
</div>
