<script lang="ts">
	import { Trash, Pencil, Plus, Instagram, Github, Facebook, ChevronLeft } from '@lucide/svelte';
	import AddingModal from '$lib/components/AddingModal.svelte';
	import EditModal from '$lib/components/EditModal.svelte';
	import { fade } from 'svelte/transition';
	import { supabase } from '$lib/supabase.js';
	import {
		loadCoding,
		loadExperiences,
		loadFooter,
		loadPersonal,
		loadProjects,
		loadSocials
	} from '$lib/supabase_data.svelte';
	let { data } = $props();

	let projects: any[] = $state([]);
	let coding: any[] = $state([]);
	let experiences: any[] = $state([]);
	let socials: any[] = $state([]);
	let personal: any[] = $state([]);
	let footer: any[] = $state([]);

	let adding = $state(false);
	let editing = $state(false);

	let id = $state(0);
	let field = $state('');

	// Load data on component mount
	async function getData() {
		coding = await loadCoding();
		experiences = await loadExperiences();
		footer = await loadFooter();
		personal = await loadPersonal();
		socials = await loadSocials();
		projects = await loadProjects();
	}

	// Load coding
	async function deleteField(field: string, id: number) {
		if (field === 'projects') {
			await supabase.from('projects').delete().eq('id', id);
		} else if (field === 'coding') {
			await supabase.from('coding').delete().eq('id', id);
		} else if (field === 'socials') {
			await supabase.from('socials').delete().eq('id', id);
		} else if (field === 'experiences') {
			await supabase.from('experiences').delete().eq('id', id);
		} else {
			console.log(`unknown field to be deleted: ${field}`);
			return;
		}
		getData();
	}

	getData();

	const closeEditingModal = () => {
		editing = false;
	};

	const closeAddingModal = () => {
		adding = false;
	};

	const chooseTheCurrentToEdit = (chosen_field: string, chosen_id: number) => {
		editing = true;
		id = 0;
		id = chosen_id;
		field = '';
		field = chosen_field;
	};
</script>

<!--Maybe snippets later-->

<div class="flex h-auto min-h-screen w-screen items-center justify-center">
	<div
		class="flex h-full w-full flex-col items-start justify-start px-4 py-8 md:w-3/4 md:py-4 lg:w-1/2 lg:py-4 xl:w-1/2 xl:py-4"
	>
		{#if adding}
			<AddingModal {closeAddingModal} {getData} />
		{:else if editing}
			<EditModal
				{closeEditingModal}
				{id}
				{field}
				{getData}
				{projects}
				{experiences}
				{footer}
				{personal}
				{socials}
				{coding}
			/>
		{:else}
			<div class="flex items-center justify-start gap-4" in:fade={{ duration: 400 }}>
				<a
					class="flex items-center justify-start gap-1 rounded-lg py-1 pr-2 pl-1 duration-125 hover:bg-zinc-950/40"
					href="/"
				>
					<ChevronLeft size={24} />
					<h1 class="text-xl font-medium">Edit portfolio</h1>
				</a>
				<button class="btn rounded-lg border-1 border-zinc-600 p-1" onclick={() => (adding = true)}>
					<Plus size={18} />
				</button>
			</div>
			<hr class="hr my-2 border-zinc-600" />
			<div class="flex w-full flex-col items-start justify-start" in:fade={{ duration: 200 }}>
				<div class="my-2 w-full">
					<p class="mb-2 text-lg">Bio</p>
					<div
						class="flex w-full items-center justify-between gap-2 border-b-1 border-zinc-600 py-1"
					>
						{#each personal as personal}
							<p class="w-full text-zinc-400">{personal.bio_text}</p>
						{/each}
						<button
							class="btn ml-auto rounded-lg bg-amber-600 p-1"
							onclick={() => chooseTheCurrentToEdit('personal', 1)}
						>
							<Pencil size={16} />
						</button>
					</div>
				</div>
				<div class="my-2 w-full">
					<p class="mb-2 text-lg">Footer</p>
					<div
						class="flex w-full items-center justify-between gap-2 border-b-1 border-zinc-600 py-1"
					>
						{#each footer as footer}
							<p class="w-full text-zinc-400">{footer.footer_text}</p>
						{/each}
						<button
							class="btn ml-auto rounded-lg bg-amber-600 p-1"
							onclick={() => chooseTheCurrentToEdit('footer', 1)}
						>
							<Pencil size={16} />
						</button>
					</div>
				</div>
				<div class="my-2 w-full">
					<p class="mb-2 text-lg">Coding</p>
					{#each coding as coding}
						<div
							class="flex w-full items-center justify-between gap-2 border-b-1 border-zinc-600 py-1"
						>
							<p class="w-full text-zinc-400">{coding.description}</p>
							<div class="flex w-auto items-center justify-center gap-2">
								<button
									class="btn rounded-lg bg-amber-600 p-1"
									onclick={() => chooseTheCurrentToEdit('coding', coding.id)}
								>
									<Pencil size={16} />
								</button>
								<button
									class="btn rounded-lg bg-red-700 p-1"
									onclick={() => deleteField('coding', coding.id)}
								>
									<Trash size={16} />
								</button>
							</div>
						</div>
					{/each}
				</div>
				<div class="my-2 w-full">
					<p class="mb-2 text-lg">Projects</p>
					{#each projects as proj}
						<div
							class="flex w-full items-center justify-between gap-2 border-b-1 border-zinc-600 py-1"
						>
							<div class="flex flex-col items-start justify-start gap-1">
								<p class="text-violet-400">{proj.name}</p>
								<p class="text-zinc-400">{proj.description.slice(0, 100)}...</p>
							</div>
							<div class="flex w-auto items-center justify-center gap-2">
								<button
									class="btn rounded-lg bg-amber-600 p-1"
									onclick={() => chooseTheCurrentToEdit('projects', proj.id)}
								>
									<Pencil size={16} />
								</button>
								<button
									class="btn rounded-lg bg-red-700 p-1"
									onclick={() => deleteField('projects', proj.id)}
								>
									<Trash size={16} />
								</button>
							</div>
						</div>
					{/each}
				</div>
				<div class="my-2 w-full">
					<p class="mb-2 text-lg">Experiences</p>
					{#each experiences as exp}
						<div
							class="flex w-full items-center justify-between gap-2 border-b-1 border-zinc-600 py-1"
						>
							<p class="w-full text-zinc-400">{exp.description}</p>
							<div class="flex w-auto items-center justify-center gap-2">
								<button
									class="btn rounded-lg bg-amber-600 p-1"
									onclick={() => chooseTheCurrentToEdit('experiences', exp.id)}
								>
									<Pencil size={16} />
								</button>
								<button
									class="btn rounded-lg bg-red-700 p-1"
									onclick={() => deleteField('experiences', exp.id)}
								>
									<Trash size={16} />
								</button>
							</div>
						</div>
					{/each}
				</div>
				<div class="my-2 w-full">
					<p class="mb-2 text-lg">Socials</p>
					{#each socials as soc}
						<div
							class="flex w-full items-center justify-between gap-2 border-b-1 border-zinc-600 py-1"
						>
							<a
								href={soc.social_url}
								target="_blank"
								class="flex items-center justify-start gap-2 rounded-lg px-2 py-1 text-zinc-400 duration-125 visited:text-zinc-400 hover:bg-zinc-950/40"
							>
								{#if soc.platform === 'Instagram'}
									<Instagram size={18} color="#FF6900" />
								{:else if soc.platform === 'Github'}
									<Github size={18} color="#5D0EC1" />
								{:else if soc.platform === 'Facebook'}
									<Facebook size={18} color="#1447E6" />
								{/if}
								{soc.social_name}</a
							>
							<div class="flex w-auto items-center justify-center gap-2">
								<button
									class="btn rounded-lg bg-amber-600 p-1"
									onclick={() => chooseTheCurrentToEdit('socials', soc.id)}
								>
									<Pencil size={16} />
								</button>
								<button
									class="btn rounded-lg bg-red-700 p-1"
									onclick={() => deleteField('socials', soc.id)}
								>
									<Trash size={16} />
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
			<form method="POST" class="my-4 mt-8" in:fade={{ duration: 100 }}>
				<button type="submit" class="btn rounded-lg bg-red-800 px-2 py-1">Log out</button>
			</form>
		{/if}
	</div>
</div>
