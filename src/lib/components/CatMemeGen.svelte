<script lang="ts">
	let { closeCatMemeGen }: { closeCatMemeGen: () => void } = $props();
	import { SquareX } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import pic from '../pictures/catPic.png';
</script>

<div in:fade={{ duration: 150 }}>
	<div
		class="mx-auto mb-4 flex h-auto w-[90%] items-center justify-center rounded-xl border-2 border-zinc-900"
	>
		<img src={pic} alt="project pic" class="mx-auto h-auto w-auto rounded-xl object-cover" />
	</div>
	<div class="flex w-full items-center justify-between">
		<h1 class="my-4 text-xl font-medium">Cat Meme Generator</h1>
		<button class="text-red-300 duration-125 hover:text-red-400" onclick={closeCatMemeGen}>
			<SquareX color="currentColor" />
		</button>
	</div>
	<p>
		First ever project of any kind. Made it at as a funny cat meme generator, to introduce myself to
		HTML, CSS and Javascript. Later changed to a gift to the Nike team I was working for.
	</p>
	<a
		href="https://lucomic.github.io/Cat-memes/"
		target="_blank"
		class="mt-2 block text-violet-400 duration-125 hover:text-violet-500"
		>https://lucomic.github.io/Cat-memes/</a
	>
	<p class="my-2 text-zinc-400">Vanilla HTML, CSS, Javascript</p>
</div>
