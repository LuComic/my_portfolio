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

<div class="flex h-auto min-h-screen w-screen items-start justify-center py-20">
	<div
		class="flex h-full w-full flex-col items-start justify-start px-4 py-8 md:w-3/4 md:py-0 lg:w-1/2 lg:py-0 xl:w-1/2 xl:py-0"
	>
		<h1
			class="mt-4 flex w-full items-center justify-between text-lg font-medium text-[#e7e5e4] visited:text-[#e7e5e4] md:text-xl"
		>
			<a href="/blog" class="flex items-center justify-start gap-1 visited:text-[#e7e5e4] md:gap-2">
				<ChevronLeft color="currentColor" />
				{foundBlog?.title}
			</a>
			{#if foundBlog?.type === 'qport'}
				<div
					class="flex w-auto flex-col items-start justify-center gap-0 text-base md:flex-row md:items-center md:gap-2 md:text-xl"
				>
					<p class="text-zinc-400">{foundBlog?.date}</p>
					<span class="vr hidden h-4 border-slate-500 md:inline"></span>
					<p class="text-zinc-400">{foundBlog?.updateType}</p>
				</div>
			{:else}
				<p class="text-zinc-400">{foundBlog?.date}</p>
			{/if}
		</h1>
		<hr class="hr mt-4 mb-3 border-zinc-600" />
		<div
			in:fade={{ duration: 100 }}
			class="mt-2 flex w-full flex-col items-start justify-start gap-3"
		>
			{#each foundBlog?.content?.split('\n').filter((line) => line.trim()) || [] as paragraph}
				<p class="text-base md:text-lg">{paragraph.trim()}</p>
			{/each}
		</div>
		<hr class="hr mt-4 mb-5 border-zinc-600" />
		<div class="flex items-center justify-start gap-2">
			<button
				onclick={goToPrevious}
				class="btn rounded-lg border border-zinc-400 hover:border-violet-400 hover:text-violet-400"
				>Previous</button
			>
			<button
				onclick={goToNext}
				class="btn rounded-lg border border-zinc-400 hover:border-violet-400 hover:text-violet-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-zinc-400 disabled:hover:text-zinc-400"
				disabled={!nextBlog}>Next</button
			>
		</div>
	</div>
</div>
