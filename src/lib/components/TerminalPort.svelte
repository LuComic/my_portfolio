<script lang="ts">
	let { closeTerminalPort }: { closeTerminalPort: () => void } = $props();
	import { SquareX } from '@lucide/svelte';
	import Carousel from './Carousel.svelte';
	import { fade } from 'svelte/transition';
	import tp1 from '../pictures/tp1.png';
	import tp2 from '../pictures/tp2.png';
	import tp3 from '../pictures/tp3.png';

	const pics = [tp1, tp2, tp3];
</script>

<div in:fade={{ duration: 150 }}>
	<Carousel {pics} />
	<div class="flex w-full items-center justify-between">
		<h1 class="my-4 text-xl font-medium">terminalport</h1>
		<button class="text-red-300 duration-125 hover:text-red-400" onclick={closeTerminalPort}>
			<SquareX color="currentColor" />
		</button>
	</div>
	<p>
		A very basic 30min project, that is a portfolio about me! It has nice ASCII art and options to
		choose from, like 'About', 'Programming', 'Projects' and 'Socials'.
	</p>
	<p class="my-2 text-zinc-400">Node js</p>
</div>
