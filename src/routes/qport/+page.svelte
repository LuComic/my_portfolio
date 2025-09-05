<script lang="ts">
	import { qport_info } from '$lib/data';
	import { onMount } from 'svelte';

	let textSection: HTMLDivElement;
	let imgContainer: HTMLDivElement;
	let spacerHeight = 0;
	let afterSpacerHeight = 0; // ensures sticky can reach the top
	let fade = 0;
	const FADE_DISTANCE = 450; // px scrolled to reach full darkness

	function recalculateSpacer() {
		if (!textSection) return;
		// Position the start just below the fixed image (plus a small gap)
		const imgRect = imgContainer?.getBoundingClientRect();
		const gapPx = 70; // adjust gap below image as desired
		if (imgRect) {
			spacerHeight = Math.max(0, imgRect.bottom - gapPx);
			// Mirror the pre-spacer after the sticky so it can reach the top offset
			afterSpacerHeight = spacerHeight;
		}
	}

	onMount(() => {
		recalculateSpacer();
		// Ensure there's always at least one viewport height after the sticky
		afterSpacerHeight = Math.max(afterSpacerHeight, window.innerHeight);
		const handleScroll = () => {
			fade = Math.min(1, window.scrollY / FADE_DISTANCE);
		};
		handleScroll();
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', () => {
			recalculateSpacer();
			// Keep after spacer large enough during resizes
			afterSpacerHeight = Math.max(afterSpacerHeight, window.innerHeight);
		});
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', recalculateSpacer);
		};
	});
</script>

<div class="flex h-auto min-h-screen w-screen items-start justify-center">
	<div class="flex w-full flex-col items-start justify-start gap-2 px-4 pb-8 md:w-[80vw] md:gap-4">
		<div bind:this={imgContainer} class="fixed top-17 z-0 h-auto md:max-w-[80vw]">
			<div class="relative flex h-auto w-auto items-center justify-center">
				<img
					src="pictures/qport_homepage.png"
					alt="homepage"
					class="h-auto w-full rounded-t-xl object-cover"
				/>
				<div class="absolute h-full w-full bg-linear-to-t from-[#18181b] to-[#18181b]/0"></div>
				<!-- Darkening overlay over the image (behind text) -->
				<div
					class="pointer-events-none absolute inset-0 h-full w-full bg-[#18181b]"
					style="opacity: {fade * 1};"
				></div>
			</div>
		</div>
		<!-- Dynamic spacer to position start below fixed image -->
		<div style="height: {spacerHeight}px"></div>
		<div
			bind:this={textSection}
			class="relative top-20 z-10 flex w-full flex-col items-start justify-start gap-2 md:w-[80vw]"
		>
			<div
				class="absolute -z-10 h-full w-full bg-gradient-to-t from-[#18181b] to-[#18181b]/0"
			></div>
			<h1 class="qport flex w-full items-center justify-start gap-1 md:ml-[-30px] md:gap-2">
				<span
					class="qport_tag text-xl text-slate-700 opacity-100 transition md:text-3xl md:opacity-0"
				>
					#
				</span>
				<div class="flex items-center justify-center gap-1">
					<span class="w-full text-left text-xl font-medium md:text-3xl">q</span>
					<span class="w-full text-left text-xl font-medium text-blue-600 md:text-3xl">(</span>
					<span class="w-full text-left text-xl font-medium md:text-3xl">uick</span>
					<span class="w-full text-left text-xl font-medium text-blue-600 md:text-3xl">)</span>
					<span class="w-full text-left text-xl font-medium md:text-3xl">port</span>
				</div>
			</h1>
			<p>
				{qport_info.intro}
			</p>
			<h2 class="idea mt-2 flex w-full items-center justify-start gap-1 md:ml-[-43px] md:gap-2">
				<span
					class="idea_tag text-xl text-slate-700 opacity-100 transition md:text-2xl md:opacity-0"
				>
					##
				</span>
				<span class="w-full text-left text-xl font-medium md:text-2xl">The Idea</span>
			</h2>
			<p>
				{qport_info.idea}
			</p>
			<ul>
				{#each qport_info.process as process (process)}
					<li class="flex items-center justify-start gap-2">
						- {process}
					</li>
				{/each}
			</ul>
			<h2 class="why mt-2 flex w-full items-center justify-start gap-1 md:ml-[-42px] md:gap-2">
				<span
					class="why_tag text-xl text-slate-700 opacity-100 transition md:text-2xl md:opacity-0"
				>
					##
				</span>
				<span class="w-full text-left text-xl font-medium md:text-2xl">Why?</span>
			</h2>
			<p>
				{qport_info.why}
			</p>
			<h2 class="features mt-2 flex w-full items-center justify-start gap-1 md:ml-[-42px] md:gap-2">
				<span
					class="features_tag text-xl text-slate-700 opacity-100 transition md:text-2xl md:opacity-0"
				>
					##
				</span>
				<span class="w-full text-left text-xl font-medium md:text-2xl">Features</span>
			</h2>
			<ul>
				{#each qport_info.features as feature (feature)}
					<li>
						{Object.keys(feature)[0]} - {Object.values(feature)[0]}
					</li>
				{/each}
			</ul>
		</div>
		<!-- Bottom spacer so sticky can reach the top offset -->
		<div style="height: {afterSpacerHeight}px"></div>
	</div>
</div>

<style>
	.qport:hover .qport_tag {
		opacity: 1;
	}

	.idea:hover .idea_tag {
		opacity: 1;
	}

	.why:hover .why_tag {
		opacity: 1;
	}

	.features:hover .features_tag {
		opacity: 1;
	}
</style>
