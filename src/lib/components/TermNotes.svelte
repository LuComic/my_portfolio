<script lang="ts">
	let { closeTermnotes }: { closeTermnotes: () => void } = $props();
	import { SquareX } from '@lucide/svelte';
	import Carousel from './Carousel.svelte';
	import { fade } from 'svelte/transition';
	import tn1 from '../pictures/tn1.png';
	import tn2 from '../pictures/tn2.png';
	import tn3 from '../pictures/tn3.png';

	const pics = [tn1, tn2, tn3];
</script>

<div in:fade={{ duration: 150 }}>
	<Carousel {pics} />
	<div class="flex w-full items-center justify-between">
		<h1 class="my-4 text-xl font-medium">termnotes</h1>
		<button class="text-red-300 duration-125 hover:text-red-400" onclick={closeTermnotes}>
			<SquareX color="currentColor" />
		</button>
	</div>
	<p>
		A simple, elegant and yet fast terminal based note taking app! It has all the features you might
		need, like markdown, copying notes, moving them between folders, dailynotes etc. If you need
		something more, then the code is open source and you can add as many features as you'd like,
		since the code is written is basic python!
	</p>
	<p class="my-2 text-zinc-400">Python</p>
</div>
