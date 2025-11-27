<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';
	import { blogs } from '$lib/data';
	import { ChevronLeft } from '@lucide/svelte';
	import { goto } from '$app/navigation';

	const blogId: number = $derived(parseInt(page.params.id));

	const foundBlog = $derived(blogs.find((blog) => blog.id === blogId));

	// Get blogs of the same type, sorted by id
	const sameTypeBlogs = $derived(
		blogs.filter((blog) => blog.type === foundBlog?.type).sort((a, b) => a.id - b.id)
	);

	// Find current blog index in the filtered list
	const currentIndex = $derived(sameTypeBlogs.findIndex((blog) => blog.id === blogId));

	// Get previous and next blogs
	const previousBlog = $derived(currentIndex > 0 ? sameTypeBlogs[currentIndex - 1] : null);
	const nextBlog = $derived(
		currentIndex < sameTypeBlogs.length - 1 ? sameTypeBlogs[currentIndex + 1] : null
	);

	// Navigation functions
	const goToPrevious = () => {
		if (previousBlog) {
			goto(`/blog/${previousBlog.id}`);
		} else {
			goto('/blog');
		}
	};

	const goToNext = () => {
		if (nextBlog) {
			goto(`/blog/${nextBlog.id}`);
		}
	};
</script>

<div class="flex h-auto min-h-screen w-screen items-start justify-center py-16 md:py-20">
	<div
		class="flex h-full w-full flex-col items-start justify-start px-4 py-8 md:w-3/4 md:py-0 lg:w-1/2 lg:py-0 xl:w-1/2 xl:py-0"
	>
		<h1
			class="mt-4 flex w-full items-center justify-between gap-4 text-lg font-medium text-[#e7e5e4] visited:text-[#e7e5e4] md:text-xl xl:text-2xl"
		>
			<a href="/blog" class="flex items-center justify-start gap-1 visited:text-[#e7e5e4] md:gap-2">
				<ChevronLeft color="currentColor" />
				{foundBlog?.title}
				{#if foundBlog?.type === 'qport'}
					<span
						class="ml-2 rounded-lg border border-green-400 px-2 py-1 text-sm md:ml-0 md:text-base"
					>
						{foundBlog?.version}
					</span>
				{/if}
			</a>
			{#if foundBlog?.type === 'qport'}
				<div
					class="flex w-auto flex-col items-start justify-center gap-0 text-base md:flex-row md:items-center md:gap-2 md:text-xl xl:text-2xl"
				>
					<p class="text-zinc-400">{foundBlog?.date}</p>
					<span class="vr hidden h-4 border-slate-500 md:inline"></span>
					<p class="text-zinc-400">{foundBlog?.updateType}</p>
				</div>
			{:else}
				<p class="text-base text-zinc-400 md:text-xl xl:text-2xl">{foundBlog?.date}</p>
			{/if}
		</h1>
		<hr class="hr mt-4 mb-3 border-zinc-600" />
		<div
			in:fade={{ duration: 100 }}
			class="mt-2 flex w-full flex-col items-start justify-start gap-3"
		>
			{#if foundBlog?.content}
				{#each foundBlog?.content?.split('\n').filter((line) => line.trim()) || [] as paragraph}
					<p class="text-base md:text-lg xl:text-xl">{paragraph.trim()}</p>
				{/each}
			{:else if foundBlog?.contentAd1 || foundBlog?.contentAd2 || foundBlog?.contentAd3 || foundBlog?.contentAd4}
				{#if foundBlog?.contentAd1}
					{#each foundBlog.contentAd1.split('\n').filter((line) => line.trim()) || [] as paragraph}
						<p class="text-base md:text-lg xl:text-xl">{paragraph.trim()}</p>
					{/each}
					{#if foundBlog?.codeAd1}
						<pre class="rounded-xl bg-zinc-950/60 p-4 text-sm text-gray-100 md:text-base"><code
								>{foundBlog.codeAd1.trim()}</code
							></pre>
					{/if}
				{/if}
				{#if foundBlog?.contentAd2}
					{#each foundBlog.contentAd2.split('\n').filter((line) => line.trim()) || [] as paragraph}
						<p class="text-base md:text-lg xl:text-xl">{paragraph.trim()}</p>
					{/each}
					{#if foundBlog?.codeAd2}
						<pre class="rounded-xl bg-zinc-950/60 p-4 text-sm text-gray-100 md:text-base"><code
								>{foundBlog.codeAd2.trim()}</code
							></pre>
					{/if}
				{/if}
				{#if foundBlog?.contentAd3}
					{#each foundBlog.contentAd3.split('\n').filter((line) => line.trim()) || [] as paragraph}
						<p class="text-base md:text-lg xl:text-xl">{paragraph.trim()}</p>
					{/each}
					{#if foundBlog?.codeAd3}
						<pre
							class="overflow-x-auto rounded-xl bg-zinc-950/60 p-4 text-sm text-gray-100 md:text-base"><code
								>{foundBlog.codeAd3.trim()}</code
							></pre>
					{/if}
				{/if}
				{#if foundBlog?.contentAd4}
					{#each foundBlog.contentAd4.split('\n').filter((line) => line.trim()) || [] as paragraph}
						<p class="text-base md:text-lg xl:text-xl">{paragraph.trim()}</p>
					{/each}
					{#if foundBlog?.codeAd4}
						<pre
							class="overflow-x-auto rounded-xl bg-zinc-950/60 p-4 text-sm text-gray-100 md:text-base"><code
								>{foundBlog.codeAd4.trim()}</code
							></pre>
					{/if}
				{/if}
			{:else}
				<p>Bazinga!</p>
			{/if}
		</div>
		<hr class="hr mt-4 mb-5 border-zinc-600" />
		<div class="flex items-center justify-start gap-2">
			<button
				onclick={goToPrevious}
				class="btn rounded-lg border border-zinc-400 transition hover:border-violet-400 hover:text-violet-400"
				>Previous</button
			>
			<button
				onclick={goToNext}
				class="btn rounded-lg border border-zinc-400 transition hover:border-violet-400 hover:text-violet-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-zinc-400 disabled:hover:text-zinc-400"
				disabled={!nextBlog}>Next</button
			>
		</div>
	</div>
</div>
