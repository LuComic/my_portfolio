<script lang="ts">
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';
	let { pics }: { pics: string[] } = $props();
	let current = $state(0);

	const moveRight = () => {
		current = (current + 1) % pics.length;
	};

	const moveLeft = () => {
		current = (current - 1 + pics.length) % pics.length;
	};
</script>

<svelte:head>
	{#each pics as pic (pic)}
		<link rel="preload" as="image" href={pic} />
	{/each}
</svelte:head>

{#each pics as pic, i (pic)}
	{#if i === current}
		<div
			class="mx-auto mb-4 flex h-auto w-[90%] items-center justify-center rounded-xl border-2 border-zinc-900"
		>
			<button class="mr-4 text-zinc-300 duration-100 hover:text-zinc-400" onclick={moveLeft}>
				<ArrowLeft color="currentColor" />
			</button>
			<img src={pic} alt="project pic" class="mx-auto h-auto w-auto rounded-xl object-cover" />
			<button class="ml-4 text-zinc-300 duration-100 hover:text-zinc-400" onclick={moveRight}>
				<ArrowRight />
			</button>
		</div>
	{/if}
{/each}
