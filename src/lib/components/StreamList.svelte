<script lang="ts">
	const { closeStreamList }: { closeStreamList: () => void } = $props();
	import { SquareX } from '@lucide/svelte';
	import Carousel from './Carousel.svelte';
	import { fade } from 'svelte/transition';
	import st1 from '../pictures/st1.jpg';
	import st2 from '../pictures/st2.jpg';
	import st3 from '../pictures/st3.jpg';

	const pics = [st1, st2, st3];
</script>

<div in:fade={{ duration: 200 }}>
	<Carousel {pics} />
	<div class="flex w-full items-center justify-between">
		<h1 class="my-4 text-xl font-medium">StreamList</h1>
		<button class="text-red-300 duration-125 hover:text-red-400" onclick={closeStreamList}>
			<SquareX color="currentColor" />
		</button>
	</div>
	<p>
		A site similar to Letterboxd, but with a new intuitive UI and a more userfriendly alternative,
		with analytics and more. Add movies AND SHOWS (which isn't possible in Letterboxd) to either
		'Watched' or 'Watchlist', rate them, leave an overview etc. You can even create your own groups
		which you can share with friends, to share what each of you likes.
	</p>
	<p class="my-2 text-zinc-400">Frontend - React + tailwind</p>
</div>
