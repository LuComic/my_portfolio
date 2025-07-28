<script lang="ts">
	import { Instagram, Github, Facebook } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import NoorteKunst from '$lib/components/NoorteKunst.svelte';
	import StreamList from '$lib/components/StreamList.svelte';
	import TermNotes from '$lib/components/TermNotes.svelte';
	import TerminalPort from '$lib/components/TerminalPort.svelte';
	import CatMemeGen from '$lib/components/CatMemeGen.svelte';

	let noorteKunstActive = $state(false);
	let streamListActive = $state(false);
	let termnotesActive = $state(false);
	let terminalportActive = $state(false);
	let catMemeGenActive = $state(false);

	const closeNoorteKunst = () => {
		noorteKunstActive = false;
	};
	const closeStreamList = () => {
		streamListActive = false;
	};
	const closeTermnotes = () => {
		termnotesActive = false;
	};
	const closeTerminalPort = () => {
		terminalportActive = false;
	};
	const closeCatMemeGen = () => {
		catMemeGenActive = false;
	};
</script>

<div class="flex h-auto min-h-screen w-screen items-center justify-center">
	<div
		class="flex h-full w-full flex-col items-start justify-start px-4 pt-8 md:w-3/4 md:pt-0 lg:w-1/2 lg:pt-0 xl:w-1/2 xl:pt-0"
	>
		{#if noorteKunstActive}
			<NoorteKunst {closeNoorteKunst} />
		{:else if streamListActive}
			<StreamList {closeStreamList} />
		{:else if termnotesActive}
			<TermNotes {closeTermnotes} />
		{:else if terminalportActive}
			<TerminalPort {closeTerminalPort} />
		{:else if catMemeGenActive}
			<CatMemeGen {closeCatMemeGen} />
		{:else}
			<div in:fade={{ duration: 400 }}>
				<h1 class="my-4 text-xl font-medium">Lukas Jääger, front-end developer</h1>
				<p>
					High school student, learning web dev in my own time and python in school. I really like
					music, I do track and field and right now program in my free time.
				</p>
				<hr class="hr my-4 border-zinc-600" />
			</div>
			<div
				in:fade={{ duration: 200 }}
				class="flex w-full flex-col gap-3 md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-4"
			>
				<div class="cursor-default">
					<p class="mb-2 text-lg">Coding</p>
					<div class="flex flex-col items-start justify-start text-zinc-400">
						<p class="px-2 py-1">- Right now learning Svelte, which I like the most</p>
						<p class="px-2 py-1">
							- Vanilla HTML, CSS and Javascript as the founding blocks of web development
						</p>
						<p class="px-2 py-1">- React basics to know it and start learning tailwind</p>
						<p class="px-2 py-1">- Typescript in React and Svelte</p>
						<p class="px-2 py-1">- Python in school</p>
					</div>
				</div>
				<div>
					<p class="mb-2 text-lg">Projects</p>
					<div class="flex flex-col items-start justify-start gap-1 text-zinc-400">
						<button
							onclick={() => (noorteKunstActive = true)}
							class="rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
							>- <p class="inline text-violet-400">noorteKunst</p>
							art gallery/social media for starting artists...</button
						>
						<button
							onclick={() => (streamListActive = true)}
							class="rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
							>- <p class="inline text-violet-400">streamList</p>
							similar to Letterboxd, but better...</button
						>
						<button
							onclick={() => (termnotesActive = true)}
							class="rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
							>- <p class="inline text-violet-400">termnotes</p>
							note taking app in the terminal...</button
						>
						<button
							onclick={() => (terminalportActive = true)}
							class="rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
							>- <p class="inline text-violet-400">terminalport</p>
							a simple portfolio in the terminal...</button
						>
						<button
							onclick={() => (catMemeGenActive = true)}
							class="rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
							>- <p class="inline text-violet-400">Cat meme generator</p>
							a basic cat meme generator...</button
						>
					</div>
				</div>
				<div class="cursor-default">
					<p class="mb-2 text-lg">Experiences</p>
					<div class="flex flex-col items-start justify-start gap-1 text-zinc-400">
						<p class="px-2 py-1">
							- coding: currently only school, <strong>noortekunst</strong> was for a student business,
							which was a bigger project
						</p>
						<p class="px-2 py-1">
							- other work: summer job at Nike (summer of 2024); summer job at Mikkeller (summer of
							2025)
						</p>
					</div>
				</div>
				<div>
					<p class="mb-2 text-lg">Socials</p>
					<div class="flex flex-col items-start justify-start gap-1 text-zinc-400">
						<a
							href="https://www.instagram.com/lucomic/"
							target="_blank"
							class="flex items-center justify-start gap-2 rounded-lg px-2 py-1 duration-125 hover:bg-zinc-950/40"
						>
							<Instagram size={18} color="#FF6900" />
							LuComic</a
						>
						<a
							href="https://github.com/LuComic"
							target="_blank"
							class="flex items-center justify-start gap-2 rounded-lg px-2 py-1 duration-125 hover:bg-zinc-950/40"
						>
							<Github size={18} color="#5D0EC1" />
							LuComic</a
						>
						<a
							href="https://www.facebook.com/profile.php?id=100032004948809"
							target="_blank"
							class="flex items-center justify-start gap-2 rounded-lg px-2 py-1 duration-125 hover:bg-zinc-950/40"
						>
							<Facebook size={18} color="#1447E6" />
							Lukas Jääger</a
						>
					</div>
				</div>
			</div>
			<div in:fade={{ duration: 100 }}>
				<hr class="hr my-4 border-zinc-600" />
				<p>
					If you have any questions or want to contact me then you can via any of the socials or
					lukasjaager@gmail.com
				</p>
				<p class="my-2 text-zinc-400">
					This portfolio is inspired by <a
						href="https://paco.me"
						target="_blank"
						class="text-violet-400 duration-125 hover:text-violet-500">Paco</a
					>
					and
					<a
						href="https://www.nexxel.dev"
						target="_blank"
						class="text-violet-400 duration-125 hover:text-violet-500">Nexxel</a
					>
				</p>
			</div>
		{/if}
	</div>
</div>
