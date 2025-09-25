<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
	import { Rabbit, FileUser } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { blogs } from '$lib/data';
	import { page } from '$app/state';
	import { SITE_NAME, resolveCanonical } from '$lib/config/seo';

	let value = $state(['']);

	const qportBlogs = blogs.filter((blog) => blog.type === 'qport');
	const personalBlogs = blogs.filter((blog) => blog.type === 'personal');

	const title = `${SITE_NAME} — Blog`;
	const description = 'Updates about projects and personal findings.';
	const canonicalUrl = $derived(resolveCanonical(page.url?.pathname || '/blog'));

	const openBlog = (id: number) => {
		goto(`/blog/${id}`);
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
</svelte:head>

<div class="flex h-auto min-h-screen w-screen items-start justify-center py-16 md:py-20">
	<div
		class="flex h-full w-full flex-col items-start justify-start px-4 py-8 md:w-3/4 md:py-0 lg:w-1/2 lg:py-0 xl:w-1/2 xl:py-0"
	>
		<div in:fade={{ duration: 200 }} class="w-full">
			<h1
				class="my-4 flex items-center justify-start text-xl font-medium text-[#e7e5e4] visited:text-[#e7e5e4]"
			>
				Blogs
			</h1>
			<p>Blogs about projects and personal findings and opinions.</p>
			<hr class="hr mt-4 mb-3 border-zinc-600" />
		</div>

		<div in:fade={{ duration: 150 }} class="flex w-full flex-col items-start justify-start gap-3">
			<Accordion {value} onValueChange={(e) => (value = e.value)} multiple>
				<Accordion.Item value="qport" controlHover="hover:text-violet-400 transition">
					<!-- Control -->
					{#snippet lead()}<Rabbit size={24} />{/snippet}
					{#snippet control()}qport updates{/snippet}
					<!-- Panel -->
					{#snippet panel()}
						{#if qportBlogs.length > 0}
							<div class="flex flex-col items-start justify-start gap-2">
								{#each qportBlogs as blog (blog.id)}
									<button
										onclick={() => openBlog(blog.id)}
										class="flex w-full items-center justify-start gap-2 transition hover:text-violet-400"
									>
										<p>{blog.updateType}</p>
										<span class="vr h-4 border-slate-500"></span>
										<p class="text-zinc-400">{blog.date}</p>
									</button>
								{/each}
							</div>
						{:else}
							<p class="text-zinc-400">Nothingess</p>
						{/if}
					{/snippet}
				</Accordion.Item>
				<hr class="hr" />
				<Accordion.Item value="personal" controlHover="hover:text-violet-400 transition">
					{#snippet lead()}<FileUser size={24} />{/snippet}
					{#snippet control()}Personal{/snippet}
					{#snippet panel()}
						{#if personalBlogs.length > 0}
							<div class="flex flex-col items-start justify-start gap-2">
								{#each personalBlogs as blog (blog.id)}
									<button
										onclick={() => openBlog(blog.id)}
										class="flex w-full items-center justify-start gap-2 transition hover:text-violet-400"
									>
										<p>{blog.title}</p>
										<span class="vr h-4 border-slate-500"></span>
										<p class="text-zinc-400">{blog.date}</p>
									</button>
								{/each}
							</div>
						{:else}
							<p class="text-zinc-400">Nothingess</p>
						{/if}
					{/snippet}
				</Accordion.Item>
			</Accordion>
		</div>
	</div>
</div>
