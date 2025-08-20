<script lang="ts">
	let {
		closeEditingModal,
		field,
		getData,
		id,
		projects,
		coding,
		experiences,
		socials,
		personal,
		footer
	}: {
		closeEditingModal: () => void;
		getData: () => void;
		field: string;
		id: number;
		projects: project_type[];
		coding: coding_type[];
		experiences: experiences_type[];
		socials: social_type[];
		personal: personal_type[];
		footer: footer_type[];
	} = $props();
	import { SquareX, X } from '@lucide/svelte';
	import type {
		project_type,
		social_type,
		coding_type,
		personal_type,
		footer_type,
		experiences_type
	} from '$lib/types';

	// Project related fields
	let projectName = $state('');
	let projectDescription = $state('');
	let projectWebsite = $state('');
	let projectSpec = $state('');
	let projectImages: FileList | undefined = $state();
	let currentImages = $state<string[]>([]);

	// Initialize all fields with current values when component loads
	$effect(() => {
		if (field === 'projects') {
			const project = projects.find((proj) => proj.id === id);
			if (project) {
				projectName = project.name || '';
				projectDescription = project.description || '';
				projectWebsite = project.website || '';
				projectSpec = project.specifications || '';
				if (project.images) {
					currentImages = [...project.images];
				}
			}
		} else if (field === 'coding') {
			const item = coding.find((item) => item.id === id);
			otherDesc = item?.description || '';
		} else if (field === 'experiences') {
			const item = experiences.find((item) => item.id === id);
			otherDesc = item?.description || '';
		} else if (field === 'personal') {
			const item = personal.find((item) => item.id === id);
			otherDesc = item?.bio_text || '';
		} else if (field === 'footer') {
			const item = footer.find((item) => item.id === id);
			otherDesc = item?.footer_text || '';
		} else if (field === 'socials') {
			const item = socials.find((item) => item.id === id);
			if (item) {
				socialsPlatform = item.platform || '';
				socials_url = item.social_url || '';
				socialName = item.social_name || '';
			}
		}
	});

	// Remove image from current images
	function removeImage(imageUrl: string) {
		currentImages = currentImages.filter((img) => img !== imageUrl);
	}

	// Other field
	let otherDesc = $state('');

	// Socials fields
	let socials_url = $state('');
	let socialsPlatform = $state('');
	let socialName = $state('');

	let notFilled = $state(false);
	let loading = $state(false);

	// Upload multiple images via server API
	async function uploadMultipleImages(files: FileList) {
		const fileArray = Array.from(files);
		const uploadPromises = fileArray.map(async (file: File) => {
			const form = new FormData();
			form.set('file', file);
			const res = await fetch('/api/storage/upload', { method: 'POST', body: form });
			if (!res.ok) {
				console.error('Error uploading:', await res.text());
				return null;
			}
			const json = await res.json();
			return json.publicUrl as string;
		});

		const imageUrls = await Promise.all(uploadPromises);
		return imageUrls.filter((url): url is string => url !== null);
	}

	// Update project
	async function updateProject(
		projectName: string,
		projectDescription: string,
		projectWebsite: string,
		projectSpec: string,
		projectImages: FileList | undefined
	) {
		if (!projectName || !projectDescription || !projectWebsite || !projectSpec) {
			notFilled = true;
			return;
		}
		notFilled = false;
		loading = true;

		// Upload new images if any
		let newImageUrls: string[] = [];
		if (projectImages && projectImages.length > 0) {
			newImageUrls = await uploadMultipleImages(projectImages);
		}

		// Combine current images with new ones
		const allImages = [...currentImages, ...newImageUrls];

		const form = new FormData();
		form.set('id', String(id));
		form.set('name', projectName.trim());
		form.set('description', projectDescription.trim());
		form.set('website', projectWebsite.trim());
		form.set('specifications', projectSpec.trim());
		form.set('imageUrls', JSON.stringify(allImages));
		const res = await fetch('?/updateProject', { method: 'POST', body: form });

		loading = false;
		getData();
		closeEditingModal();
		if (!res.ok) {
			console.error('Update project failed', await res.text());
		}
		return {};
	}

	// Update other fields
	async function updateOtherFields(someDesc: string) {
		if (!someDesc) {
			notFilled = true;
			return;
		}
		notFilled = false;
		loading = true;

		const f = new FormData();
		f.set('table', field);
		f.set('id', String(id));
		f.set('description', someDesc.trim());
		const r = await fetch('?/updateOther', { method: 'POST', body: f });
		loading = false;
		getData();
		closeEditingModal();
		if (!r.ok) {
			console.error('Update failed', await r.text());
		}
		return {};
	}

	// Update socials
	async function updateSocials(socialsPlatform: string, social_url: string, socialName: string) {
		if (!socialsPlatform || !social_url || !socialName) {
			notFilled = true;
			return;
		}
		notFilled = false;
		loading = true;

		const sform = new FormData();
		sform.set('id', String(id));
		sform.set('platform', socialsPlatform.trim());
		sform.set('social_url', social_url.trim());
		sform.set('social_name', socialName.trim());
		const rr = await fetch('?/updateSocial', { method: 'POST', body: sform });
		loading = false;
		getData();
		closeEditingModal();
		if (!rr.ok) {
			console.error('Update socials failed', await rr.text());
		}
		return {};
	}
</script>

<div class="w-full">
	<div class="flex w-full items-center justify-between">
		<h1 class="my-4 w-full text-xl font-medium">Edit '{field}'</h1>
		<button class="text-red-300 duration-125 hover:text-red-400" onclick={closeEditingModal}>
			<SquareX color="currentColor" />
		</button>
	</div>
	<!--Chosen forms-->
	{#if field === 'projects'}
		<div class="flex flex-col items-start justify-start gap-4">
			<label class="label">
				<span class="label-text text-base">Project's name</span>
				<input
					class="input border-1 border-zinc-600 text-base"
					type="text"
					bind:value={projectName}
				/>
			</label>
			<label class="label">
				<span class="label-text text-base">Project's description</span>
				<textarea
					class="textarea border-1 border-zinc-600 text-base"
					rows="4"
					bind:value={projectDescription}
				></textarea>
			</label>
			<label class="label">
				<span class="label-text text-base">Project's website</span>
				<div class="input-group grid-cols-[auto_1fr_auto] border-1 border-zinc-600 text-base">
					<div class="ig-cell preset-tonal">https://</div>
					<input
						class="ig-input border-1 border-zinc-600 text-base"
						type="text"
						bind:value={projectWebsite}
					/>
				</div>
			</label>
			<label class="label">
				<span class="label-text text-base">Coding specification</span>
				<input
					class="input border-1 border-zinc-600 text-base"
					type="text"
					bind:value={projectSpec}
				/>
			</label>
			<div class="label">
				<span class="label-text text-base">Current Images</span>
				{#if currentImages.length > 0}
					<div
						class="mt-2 flex flex-col gap-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-3"
					>
						{#each currentImages as imageUrl}
							<div class="relative">
								<img
									src={imageUrl}
									alt={projects.find((proj) => proj.id === id)?.name || ''}
									class="h-20 w-full rounded object-cover"
								/>
								<button
									type="button"
									class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
									onclick={() => removeImage(imageUrl)}
								>
									<X size={14} />
								</button>
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-zinc-400">No images currently</p>
				{/if}
			</div>
			<label class="label">
				<span class="label-text text-base">Add new images</span>
				<input
					class="input border-1 border-zinc-600 text-base"
					type="file"
					accept="image/png, image/jpeg"
					multiple
					bind:files={projectImages}
				/>
			</label>
			{#if notFilled}
				<p class="text-red-500">Fill in all forms</p>
			{/if}
			<button
				class="btn rounded-lg bg-green-700 px-2 py-1"
				disabled={loading}
				onclick={() => {
					updateProject(
						projectName,
						projectDescription,
						projectWebsite,
						projectSpec,
						projectImages
					);
				}}>{loading ? 'Updating...' : 'Update'}</button
			>
		</div>
	{:else if field === 'coding' || field === 'experiences' || field === 'personal' || field === 'footer'}
		<div class="flex flex-col items-start justify-start gap-4">
			<label class="label">
				<span class="label-text text-base"></span>
				<textarea
					class="textarea border-1 border-zinc-600 text-base"
					rows="4"
					bind:value={otherDesc}
				></textarea>
			</label>
			{#if notFilled}
				<p class="text-red-500">Fill in all forms</p>
			{/if}
			<button
				class="btn rounded-lg bg-green-700 px-2 py-1"
				disabled={loading}
				onclick={() => updateOtherFields(otherDesc)}>{loading ? 'Updating...' : 'Update'}</button
			>
		</div>
	{:else if field === 'socials'}
		<div class="flex flex-col items-start justify-start gap-4">
			<label class="label">
				<span class="label-text text-base">Add Social</span>
				<select class="select border-1 border-zinc-600 px-2 text-base" bind:value={socialsPlatform}>
					<option value="">--Platform--</option>
					<option
						selected={socials.find((soc) => soc.id === id)?.platform === 'Instagram'}
						value="Instagram"
					>
						Instagram
					</option>
					<option
						value="Github"
						selected={socials.find((soc) => soc.id === id)?.platform === 'Github'}
					>
						Github
					</option>
					<option
						value="Facebook"
						selected={socials.find((soc) => soc.id === id)?.platform === 'Facebook'}
					>
						Facebook
					</option>
				</select>
				<input
					class="input border-1 border-zinc-600 text-base"
					type="text"
					bind:value={socials_url}
				/>
				<input
					class="input border-1 border-zinc-600 text-base"
					type="text"
					bind:value={socialName}
				/>
			</label>
			{#if notFilled}
				<p class="text-red-500">Fill in all forms</p>
			{/if}
			<button
				class="btn rounded-lg bg-green-700 px-2 py-1"
				disabled={loading}
				onclick={() => updateSocials(socialsPlatform, socials_url, socialName)}
				>{loading ? 'Updating...' : 'Update'}</button
			>
		</div>
	{/if}
</div>
