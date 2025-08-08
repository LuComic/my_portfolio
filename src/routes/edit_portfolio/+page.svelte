<script lang="ts">
	import {
		Trash,
		Pencil,
		Plus,
		Instagram,
		Github,
		Facebook,
		ChevronLeft,
		Grip
	} from '@lucide/svelte';
	import AddingModal from '$lib/components/AddingModal.svelte';
	import EditModal from '$lib/components/EditModal.svelte';
	import { fade } from 'svelte/transition';
	import { supabase } from '$lib/supabase.js';
	import { dndzone } from 'svelte-dnd-action';
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

	// Drag & drop reordering for projects using svelte-dnd-action
	let savingOrder = $state(false);
	let saveError = $state('');

	async function persistProjectOrder() {
		saveError = '';
		savingOrder = true;
		let hadError = false;
		try {
			await Promise.all(
				projects.map(async (proj, idx) => {
					const { error } = await supabase
						.from('projects')
						.update({ order_index: idx })
						.eq('id', proj.id);
					if (error) throw error;
				})
			);
		} catch (e) {
			console.error('Failed to save order', e);
			saveError = 'Failed to save order';
			hadError = true;
		} finally {
			savingOrder = false;
			if (!hadError) getData();
		}
	}

	async function persistOrderFor(
		table: 'coding' | 'experiences' | 'socials',
		items: Array<{ id: number }>
	) {
		saveError = '';
		savingOrder = true;
		let hadError = false;
		try {
			await Promise.all(
				items.map(async (item, idx) => {
					const { error } = await supabase
						.from(table)
						.update({ order_index: idx })
						.eq('id', item.id);
					if (error) throw error;
				})
			);
		} catch (e) {
			console.error('Failed to save order for', table, e);
			saveError = 'Failed to save order';
			hadError = true;
		} finally {
			savingOrder = false;
			if (!hadError) getData();
		}
	}
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
				<div class="my-2 w-full" style="user-select: none;">
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
					<div
						use:dndzone={{ items: coding, flipDurationMs: 150, dropTargetStyle: {} }}
						onconsider={(e) => (coding = e.detail.items)}
						onfinalize={async () => {
							await persistOrderFor('coding', coding);
						}}
						class="dnd-zone w-full"
					>
						{#each coding as codingItem (codingItem.id)}
							<div
								class="flex w-full items-center justify-between gap-2 border-b-1 border-zinc-600 py-1"
								data-id={codingItem.id}
							>
								<div class="flex items-center gap-2">
									<div
										class="drag-handle cursor-grab px-1 text-zinc-500"
										style="user-select: none;"
										role="button"
										tabindex="0"
									>
										<Grip size={18} />
									</div>
									<p class="w-full text-zinc-400">{codingItem.description}</p>
								</div>
								<div class="flex w-auto items-center justify-center gap-2">
									<button
										class="btn rounded-lg bg-amber-600 p-1"
										onclick={() => chooseTheCurrentToEdit('coding', codingItem.id)}
									>
										<Pencil size={16} />
									</button>
									<button
										class="btn rounded-lg bg-red-700 p-1"
										onclick={() => deleteField('coding', codingItem.id)}
									>
										<Trash size={16} />
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="my-2 w-full">
					<p class="mb-2 text-lg">Projects</p>
					{#if saveError}
						<p class="text-sm text-red-500">{saveError}</p>
					{/if}
					<div
						use:dndzone={{
							items: projects,
							dragDisabled: false,
							flipDurationMs: 150,
							dropTargetStyle: {}
						}}
						onconsider={(e) => (projects = e.detail.items)}
						onfinalize={async () => {
							await persistProjectOrder();
						}}
						class="dnd-zone w-full"
					>
						{#each projects as proj, i (proj.id)}
							<div
								class="flex w-full items-center justify-between gap-2 border-b-1 border-zinc-600 py-1"
								role="listitem"
								style="user-select: none;"
								data-id={proj.id}
							>
								<div class="flex items-center gap-2">
									<div
										class="drag-handle cursor-grab px-1 text-zinc-500"
										style="user-select: none;"
										role="button"
										tabindex="0"
									>
										<Grip size={18} />
									</div>
									<div class="flex flex-col items-start justify-start gap-1">
										<p class="text-violet-400">{proj.name}</p>
										<p class="text-zinc-400">{proj.description.slice(0, 100)}...</p>
									</div>
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
				</div>
				<div class="my-2 w-full">
					<p class="mb-2 text-lg">Experiences</p>
					<div
						use:dndzone={{ items: experiences, flipDurationMs: 150, dropTargetStyle: {} }}
						onconsider={(e) => (experiences = e.detail.items)}
						onfinalize={async () => {
							await persistOrderFor('experiences', experiences);
						}}
						class="dnd-zone w-full"
					>
						{#each experiences as exp (exp.id)}
							<div
								class="flex w-full items-center justify-between gap-2 border-b-1 border-zinc-600 py-1"
								data-id={exp.id}
							>
								<div class="flex items-center gap-2">
									<div
										class="drag-handle cursor-grab px-1 text-zinc-500"
										style="user-select: none;"
										role="button"
										tabindex="0"
									>
										<Grip size={18} />
									</div>
									<p class="w-full text-zinc-400">{exp.description}</p>
								</div>
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
				</div>
				<div class="my-2 w-full">
					<p class="mb-2 text-lg">Socials</p>
					<div
						use:dndzone={{ items: socials, flipDurationMs: 150, dropTargetStyle: {} }}
						onconsider={(e) => (socials = e.detail.items)}
						onfinalize={async () => {
							await persistOrderFor('socials', socials);
						}}
						class="dnd-zone w-full"
					>
						{#each socials as soc (soc.id)}
							<div
								class="flex w-full items-center justify-between gap-2 border-b-1 border-zinc-600 py-1"
								data-id={soc.id}
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
									{soc.social_name}
								</a>
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
			</div>
			<form method="POST" class="my-4 mt-8" in:fade={{ duration: 100 }}>
				<button type="submit" class="btn rounded-lg bg-red-800 px-2 py-1">Log out</button>
			</form>
		{/if}
	</div>
</div>
