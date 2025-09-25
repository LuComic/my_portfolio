<script lang="ts">
	import { Instagram, Github, Facebook, ChevronRight, History } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import Projects from '$lib/components/Projects.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import WindowsPage from '$lib/components/windowsMode/WindowsPage.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, resolveCanonical } from '$lib/config/seo';

	let { data }: PageData = $props();

	const pageTitle = SITE_NAME;
	const pageDescription = data?.personal?.[0]?.bio_text || SITE_DESCRIPTION;
	const canonicalUrl = $derived(resolveCanonical(page.url?.pathname || '/'));

	let projectsActive = $state(false);

	let projects = $state(data.projects);
	let coding = $state(data.coding);
	let experiences = $state(data.experiences);
	let socials = $state(data.socials);
	let personal = $state(data.personal);
	let footer = $state(data.footer);

	let id_from_projects = $state(0);

	$effect(() => {
		if (id_from_projects > 0) {
			openProject(id_from_projects);
			id_from_projects = 0;
		}
	});

	const openProject = (id: number) => {
		goto(`/${id}`);
	};

	const closeProjects = () => {
		projectsActive = false;
	};

	// Windows view stuff

	let outerWidth = $state(0);
	let isMobile = $state(false);
	let windowsMode = $state(false);
	let isWindows;

	onMount(() => {
		isWindows = window.localStorage.getItem('isWindows');

		if (!isWindows) {
			window.localStorage.setItem('isWindows', 'false');
		} else if (isWindows === 'true') {
			windowsMode = true;
		} else if (isWindows === 'false') {
			windowsMode = false;
		}
	});

	$effect(() => {
		if (outerWidth > 800) {
			isMobile = false;
		} else {
			isMobile = true;
		}
	});

	const goBackInTime = () => {
		windowsMode = true;
		window.localStorage.setItem('isWindows', 'true');
	};

	const goBackToTheModernDay = () => {
		windowsMode = false;
		window.localStorage.setItem('isWindows', 'false');
	};

	// Keep font-family in sync with windowsMode
	$effect(() => {
		const coralPixels = 'Old Standard TT, serif';
		const rubik = 'Rubik Variable, sans-serif';
		if (windowsMode) {
			document.documentElement.style.fontFamily = coralPixels;
			document.body.style.fontFamily = coralPixels;
		} else {
			document.documentElement.style.fontFamily = rubik;
			document.body.style.fontFamily = rubik;
		}
	});

	// Height for the projects component
	let projectsHeight = $state(0);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonicalUrl} />

	<script type="application/ld+json">
		{JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'Lukas Jääger',
			description: pageDescription,
			url: SITE_URL,
			sameAs: (data?.socials || []).map((soc) => soc.social_url)
		})}
	</script>
</svelte:head>

<svelte:window bind:outerWidth />

{#if isMobile === false && windowsMode === false}
	<button
		class="btn absolute top-5 right-5 z-20 flex items-center justify-center gap-2 rounded-lg border border-zinc-400 transition hover:border-violet-400 hover:text-violet-400"
		onclick={goBackInTime}
	>
		<History color="currentColor" size={18} />
		Go back in time</button
	>
{/if}

<div class="flex h-auto min-h-screen w-screen items-center justify-center">
	{#if windowsMode}
		<WindowsPage {goBackToTheModernDay} />
	{:else}
		<div
			class="flex w-full flex-col items-start justify-start px-4 py-8 md:w-3/4 md:py-0 lg:w-1/2 lg:py-0"
		>
			<div in:fade={{ duration: 400 }}>
				<div class="my-4 flex items-center justify-start">
					<a
						href="/admin_pin"
						class="hover:btn rounded-lg text-xl font-medium text-[#e7e5e4] visited:text-[#e7e5e4] hover:bg-zinc-950/40 hover:px-2 hover:py-1 hover:text-xl"
						>Lukas Jääger</a
					>
					<h1 class="text-xl font-medium">, front-end developer</h1>
				</div>
				<p>
					{personal[0]?.bio_text}
					Check out my
					<a
						href="/blog"
						class="text-violet-400 transition visited:text-violet-400 hover:text-violet-500"
						>blog and updates on projects</a
					>!
				</p>
				<hr class="hr mt-4 mb-3 border-zinc-600" />
			</div>
			{#if projectsActive}
				<Projects bind:id_from_projects {closeProjects} {projects} {projectsHeight} />
			{:else}
				<div
					in:fade={{ duration: 200 }}
					class="flex w-full flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-4"
					bind:clientHeight={projectsHeight}
				>
					<div class="cursor-default">
						<p class="mb-1 px-2 py-1 text-lg">Coding</p>
						<div class="flex flex-col items-start justify-start text-zinc-400">
							{#each coding as code (code.id)}
								<p class="px-2 py-1">- {code?.description}</p>
							{/each}
						</div>
					</div>
					<div>
						<button
							class="mb-1 flex items-center justify-start gap-1 rounded-lg px-2 py-1 duration-125 hover:bg-zinc-950/40"
							onclick={() => (projectsActive = true)}
						>
							<p class="text-lg">Projects</p>
							<ChevronRight size={20} />
						</button>
						<div class="flex flex-col items-start justify-start gap-1 text-zinc-400">
							<a
								href="/qport"
								class="rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
								>- <p class="inline text-violet-400">qport:&nbsp</p>
								A simple, fast and cheap portfolio buider...</a
							>
							{#each projects.slice(0, 3) as proj (proj.id)}
								<button
									onclick={() => openProject(proj.id)}
									class="rounded-lg px-2 py-1 text-left duration-125 hover:bg-zinc-950/40"
									>- <p class="inline text-violet-400">{proj?.name}:&nbsp</p>
									{proj?.description.slice(0, 40)}...</button
								>
							{/each}
						</div>
					</div>
					<div class="cursor-default">
						<p class="mb-1 px-2 py-1 text-lg">Experiences</p>
						<div class="flex flex-col items-start justify-start gap-1 text-zinc-400">
							{#each experiences as exp (exp.id)}
								<p class="px-2 py-1">
									- {exp?.description}
								</p>
							{/each}
						</div>
					</div>
					<div>
						<p class="mb-1 px-2 py-1 text-lg">Socials</p>
						<div class="flex flex-col items-start justify-start gap-1 text-zinc-400">
							{#each socials as soc (soc.id)}
								<a
									href={soc?.social_url}
									target="_blank"
									class="flex items-center justify-start gap-2 rounded-lg px-2 py-1 duration-125 hover:bg-zinc-950/40"
									>{#if soc?.platform === 'Instagram'}
										<Instagram size={18} color="#FF6900" />
									{:else if soc.platform === 'Github'}
										<Github size={18} color="#5D0EC1" />
									{:else if soc.platform === 'Facebook'}
										<Facebook size={18} color="#1447E6" />
									{/if}
									{soc?.social_name}
								</a>
							{/each}
						</div>
					</div>
				</div>
			{/if}
			<div in:fade={{ duration: 100 }}>
				<hr class="hr my-4 border-zinc-600" />
				<p>
					{footer[0]?.footer_text}
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
		</div>
	{/if}
</div>
