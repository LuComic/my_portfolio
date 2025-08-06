<script lang="ts">
	let { closeNoorteKunst }: { closeNoorteKunst: () => void } = $props();
	import { SquareX } from '@lucide/svelte';
	import Carousel from './Carousel.svelte';
	import { fade } from 'svelte/transition';
	import nk1 from '../pictures/nk1.png';
	import nk2 from '../pictures/nk2.png';
	import nk3 from '../pictures/nk3.png';

	const pics = [nk1, nk2, nk3];
</script>

<div in:fade={{ duration: 150 }}>
	<Carousel {pics} />
	<div class="flex w-full items-center justify-between">
		<h1 class="my-4 text-xl font-medium">noorteKunst</h1>
		<button class="text-red-300 duration-125 hover:text-red-400" onclick={closeNoorteKunst}>
			<SquareX color="currentColor" />
		</button>
	</div>
	<p>
		noorteKunst is a web gallery combined with social media aspects for young starting artists to
		start or boost their art jounrey. A simple way to stand out (which is basically impossible in
		social media), grow your portfolio and find fans. Also if you're interested in art, noorteKunst
		is a good way to find young artists and do things that you can do on every social media platform
		- like posts, save them and follow artists. (site is right now only in estonian)
	</p>
	<a
		href="https://noortekunst.ee/"
		target="_blank"
		class="mt-2 block text-violet-400 duration-125 hover:text-violet-500">https://noortekunst.ee/</a
	>
	<p class="my-2 text-zinc-400">Frontend - Vanilla HTML, CSS, Javascript</p>
</div>
