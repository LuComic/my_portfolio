<script lang="ts">
	import type { social_type } from '$lib/types';

	const {
		closeSocials,
		socials,
		modalOrder,
		bringModalToFront
	}: {
		closeSocials: () => void;
		socials: social_type[];
		modalOrder: string[];
		bringModalToFront: (modalName: string) => void;
	} = $props();

	// Calculate position based on this modal's position in the stack
	const modalIndex = $derived(modalOrder.indexOf('socials'));
	let left = $state(100 + modalIndex * 20);
	let top = $state(100 + modalIndex * 20);
	const zIndex = $derived(40 + modalIndex * 10);

	let moving = false;

	function onmousedown() {
		moving = true;
		bringModalToFront('socials');
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
	class="absolute flex h-auto min-h-[200px] w-[420px] max-w-[500px] flex-col items-start justify-start rounded-md border-t-2 border-t-[#9cbbf3] bg-[#1B5CD8] px-1 pb-1 shadow-lg"
	style="left: {left}px; top: {top}px; z-index: {zIndex};"
>
	<div class="flex w-full items-center justify-between px-1 py-1">
		<p class="font-bold">Socials</p>
		<button
			onclick={closeSocials}
			class="h-6 w-6 border border-white bg-[#EE715E] text-white hover:bg-[#ca5f4e]">X</button
		>
	</div>
	<div class="flex w-full flex-1 items-start justify-start rounded-md bg-white p-2 text-black">
		<div class="flex w-full flex-col gap-1">
			{#each socials as soc (soc.id)}
				<a href={soc?.social_url} target="_blank" class="text-blue-700 visited:text-violet-700"
					>{soc?.platform}: {soc?.social_name}</a
				>
			{/each}
		</div>
	</div>
</div>
