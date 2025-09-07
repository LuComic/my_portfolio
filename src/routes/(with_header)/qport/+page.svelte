<script lang="ts">
	import { qport_info } from '$lib/data';
	import { fade } from 'svelte/transition';
	import { blogs } from '$lib/data';

	let y = $state(0);
	let outerWidth = $state(0);
	let fullDark = $state(false);
	let isMobile = $state(false);

	$effect(() => {
		if (outerWidth > 600) {
			isMobile = false;
		} else {
			isMobile = true;
		}

		if (isMobile) {
			if (y > 100) {
				fullDark = true;
			} else {
				fullDark = false;
			}
		} else {
			if (y > 300) {
				fullDark = true;
			} else {
				fullDark = false;
			}
		}
	});

	const latestVersionId = Math.max(
		...blogs.filter((blog) => blog.type === 'qport').map((blog) => blog.id)
	);
	const latestVersion = blogs.find((blog) => blog.id === latestVersionId);
</script>

<svelte:window bind:scrollY={y} bind:outerWidth />

<div class="my-8 flex h-auto min-h-screen w-screen items-start justify-center">
	<div
		class="flex h-full w-full flex-col items-start justify-start gap-2 px-4 pb-8 md:w-[80vw] md:gap-4"
	>
		{#if !fullDark}
			<div
				class="fixed inset-x-0 top-18 z-0 h-1/3 w-full px-4 transition md:mx-4 md:h-2/3 md:px-0"
				transition:fade={{ duration: 150 }}
			>
				<div
					class="relative mx-auto flex h-full w-full items-center justify-center overflow-hidden rounded-t-xl md:w-[80vw]"
				>
					<img
						src="pictures/qport_homepage.png"
						alt="homepage"
						class="h-full w-full object-cover"
					/>
					<div class="absolute h-full w-full bg-linear-to-t from-[#18181b] to-[#18181b]/0"></div>
				</div>
			</div>
		{/if}
		<div class="flex h-screen w-full flex-col items-center justify-start md:w-[80vw]">
			<div class="h-2/6 w-full bg-transparent md:h-2/3"></div>
			<div class="z-10 flex h-4/6 w-full flex-col items-start justify-start gap-2 md:h-1/3">
				<h1 class="qport mb-2 flex w-full items-center justify-start gap-1 md:ml-[-30px] md:gap-2">
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
					<span class="ml-2 rounded-lg border border-green-400 px-2 py-1 text-sm md:ml-0"
						>{latestVersion?.version}</span
					>
				</h1>
				<p>
					{qport_info.intro}
				</p>
				<h2
					class="overall mt-2 flex w-full items-center justify-start gap-1 md:ml-[-42px] md:gap-2"
				>
					<span
						class="overall_tag text-xl text-slate-700 opacity-100 transition md:text-2xl md:opacity-0"
					>
						##
					</span>
					<span class="w-full text-left text-xl font-medium md:text-2xl">Overall</span>
				</h2>
				<h3 class="idea mt-2 flex w-full items-center justify-start gap-1 md:ml-[-50px] md:gap-2">
					<span class="idea_tag text-xl text-slate-700 opacity-100 transition md:opacity-0">
						###
					</span>
					<span class="w-full text-left text-xl font-medium">The Idea</span>
				</h3>
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
				<h3 class="why mt-2 flex w-full items-center justify-start gap-1 md:ml-[-50px] md:gap-2">
					<span class="why_tag text-xl text-slate-700 opacity-100 transition md:opacity-0">
						###
					</span>
					<span class="w-full text-left text-xl font-medium">Why?</span>
				</h3>
				<p>
					{qport_info.why}
				</p>
				<h2 class="spec mt-2 flex w-full items-center justify-start gap-1 md:ml-[-42px] md:gap-2">
					<span
						class="spec_tag text-xl text-slate-700 opacity-100 transition md:text-2xl md:opacity-0"
					>
						##
					</span>
					<span class="w-full text-left text-xl font-medium md:text-2xl">Specific</span>
				</h2>
				<p>
					For updates and more in depth information check out the
					<a
						href="/blog"
						class="text-violet-400 transition visited:text-violet-400 hover:text-violet-500"
						>qport's blog</a
					>.
				</p>
				<h3
					class="features mt-2 flex w-full items-center justify-start gap-1 md:ml-[-50px] md:gap-2"
				>
					<span class="features_tag text-xl text-slate-700 opacity-100 transition md:opacity-0">
						###
					</span>
					<span class="w-full text-left text-xl font-medium">Features</span>
				</h3>
				<ul>
					{#each qport_info.features as feature (feature)}
						<li>
							- {Object.keys(feature)[0]} - {Object.values(feature)[0]}
						</li>
					{/each}
				</ul>
				<h3 class="tech mt-2 flex w-full items-center justify-start gap-1 md:ml-[-50px] md:gap-2">
					<span class="tech_tag text-xl text-slate-700 opacity-100 transition md:opacity-0">
						###
					</span>
					<span class="w-full text-left text-xl font-medium">Tech Stack</span>
				</h3>
				<ul class="pb-20">
					{#each qport_info.techStack as tech (tech)}
						<li class="flex items-center justify-start gap-2">
							- {tech}
						</li>
					{/each}
				</ul>
			</div>
		</div>
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

	.tech:hover .tech_tag {
		opacity: 1;
	}

	.overall:hover .overall_tag {
		opacity: 1;
	}

	.spec:hover .spec_tag {
		opacity: 1;
	}
</style>
