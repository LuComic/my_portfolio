<script lang="ts">
	let { closeNiceUtil }: { closeNiceUtil: () => void } = $props();
	import { SquareX } from '@lucide/svelte';
	import Carousel from './Carousel.svelte';
	import { fade } from 'svelte/transition';
	import nu1 from '../pictures/nu1.png';
	import nu2 from '../pictures/nu2.png';
	import nu3 from '../pictures/nu3.png';

	const pics = [nu1, nu2, nu3];
</script>

<div in:fade={{ duration: 150 }}>
	<Carousel {pics} />
	<div class="flex w-full items-center justify-between">
		<h1 class="my-4 text-xl font-medium">NiceUtil</h1>
		<button class="text-red-300 duration-125 hover:text-red-400" onclick={closeNiceUtil}>
			<SquareX color="currentColor" />
		</button>
	</div>
	<p>
		A vibe coded project since I needed an utility like this.<br />
		NiceUtil combines the visual aspect of applications like Spaceman, Waybar etc, to show spaces in
		your menubar, and applications that let you save your Workspaces/Virtual Desktops. More info in the
		Github repo.
	</p>
	<a
		href="https://noortekunst.ee/"
		target="_blank"
		class="mt-2 block text-violet-400 duration-125 hover:text-violet-500"
		>https://github.com/LuComic/NiceUtil</a
	>
	<p class="my-2 text-zinc-400">Swift</p>
</div>
