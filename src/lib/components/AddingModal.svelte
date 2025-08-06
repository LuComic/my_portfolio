<script lang="ts">
	let { closeAddingModal, getData }: { closeAddingModal: () => void; getData: () => void } =
		$props();
	import { supabase } from '$lib/supabase';
	import { SquareX } from '@lucide/svelte';

	let projectName = $state('');
	let projectDescription = $state('');
	let projectWebsite = $state('');
	let projectSpec = $state('');
	let projectImages: FileList | undefined = $state();
	let codingDesc = $state('');
	let experiencesDesc = $state('');
	let socials_url = $state('');
	let socialsPlatform = $state('');
	let socialName = $state('');

	let notFilled = $state(false);
	let loading = $state(false);

	let chosen_addition = $state('');

	// Upload multiple images
	async function uploadMultipleImages(files: FileList) {
		const fileArray = Array.from(files);
		const uploadPromises = fileArray.map(async (file: File) => {
			const fileExt = file.name.split('.').pop();
			const fileName = `${Math.random()}.${fileExt}`;

			const { data, error } = await supabase.storage.from('images').upload(fileName, file);

			if (error) {
				console.error('Error uploading:', error);
				return null;
			}

			const {
				data: { publicUrl }
			} = supabase.storage.from('images').getPublicUrl(fileName);

			return publicUrl;
		});

		const imageUrls = await Promise.all(uploadPromises);
		return imageUrls.filter((url): url is string => url !== null);
	}

	// Add project with multiple images
	async function addProject(
		projectName: string,
		projectDescription: string,
		projectWebsite: string,
		projectSpec: string,
		projectImages: FileList | undefined
	) {
		if (!projectName || !projectDescription || !projectWebsite || !projectSpec || !projectImages) {
			notFilled = true;
			return;
		}
		notFilled = false;
		loading = true;
		const imageUrls = await uploadMultipleImages(projectImages);

		const { data, error } = await supabase.from('projects').insert([
			{
				name: projectName,
				description: projectDescription,
				website: projectWebsite,
				specifications: projectSpec,
				images: imageUrls // PostgreSQL automatically handles the array
			}
		]);
		loading = false;
		getData();
		closeAddingModal();
		return { data, error };
	}

	// Add coding
	async function addCoding(codingDesc: string) {
		if (!codingDesc) {
			notFilled = true;
			return;
		}
		notFilled = false;
		loading = true;

		const { data, error } = await supabase.from('coding').insert([
			{
				description: codingDesc
			}
		]);
		loading = false;
		getData();
		closeAddingModal();
		return { data, error };
	}

	// Add socials
	async function addSocials(socialsPlatform: string, social_url: string, socialName: string) {
		if (!socialsPlatform || !social_url || !socialName) {
			notFilled = true;
			return;
		}
		notFilled = false;
		loading = true;

		const { data, error } = await supabase.from('socials').insert([
			{
				platform: socialsPlatform,
				social_url: social_url,
				social_name: socialName
			}
		]);
		loading = false;
		getData();
		closeAddingModal();
		return { data, error };
	}

	// Add experiences
	async function addExperience(experiencesDesc: string) {
		if (!experiencesDesc) {
			notFilled = true;
			return;
		}
		notFilled = false;
		loading = true;

		const { data, error } = await supabase.from('experiences').insert([
			{
				description: experiencesDesc
			}
		]);
		loading = false;
		getData();
		closeAddingModal();
		return { data, error };
	}
</script>

<div class="w-full">
	<div class="flex w-full items-center justify-between">
		<h1 class="my-4 w-full text-xl font-medium">Add something</h1>
		<button class="text-red-300 duration-125 hover:text-red-400" onclick={closeAddingModal}>
			<SquareX color="currentColor" />
		</button>
	</div>

	<!--What will be added-->
	<div class="mb-4 w-full space-y-2">
		<label class="flex cursor-pointer items-center space-x-2">
			<input
				class="radio accent-violet-400"
				type="radio"
				bind:group={chosen_addition}
				name="radio-direct"
				value="Project"
			/>
			<p>Project</p>
		</label>
		<label class="flex cursor-pointer items-center space-x-2">
			<input
				class="radio accent-violet-400"
				type="radio"
				bind:group={chosen_addition}
				name="radio-direct"
				value="Coding"
			/>
			<p>Coding</p>
		</label>
		<label class="flex cursor-pointer items-center space-x-2">
			<input
				class="radio accent-violet-400"
				type="radio"
				bind:group={chosen_addition}
				name="radio-direct"
				value="Experience"
			/>
			<p>Experience</p>
		</label>
		<label class="flex cursor-pointer items-center space-x-2">
			<input
				class="radio accent-violet-400"
				type="radio"
				bind:group={chosen_addition}
				name="radio-direct"
				value="Social"
			/>
			<p>Social</p>
		</label>
	</div>

	<!--Chosen forms-->
	{#if chosen_addition === 'Project'}
		<div class="flex flex-col items-start justify-start gap-4">
			<label class="label">
				<span class="label-text text-base">Project's name</span>
				<input
					class="input border-1 border-zinc-600 text-base"
					type="text"
					placeholder="noorteKunst"
					bind:value={projectName}
				/>
			</label>
			<label class="label">
				<span class="label-text text-base">Project's description</span>
				<textarea
					class="textarea border-1 border-zinc-600 text-base"
					rows="4"
					placeholder="This project is about..."
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
						placeholder="www.example.com"
						bind:value={projectWebsite}
					/>
				</div>
			</label>
			<label class="label">
				<span class="label-text text-base">Coding specification</span>
				<input
					class="input border-1 border-zinc-600 text-base"
					type="text"
					placeholder="Frontend - HTML, CSS, JS"
					bind:value={projectSpec}
				/>
			</label>
			<label class="label">
				<span class="label-text text-base">Images about the project</span>
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
					addProject(projectName, projectDescription, projectWebsite, projectSpec, projectImages);
				}}>{loading ? 'Adding...' : 'Add'}</button
			>
		</div>
	{:else if chosen_addition === 'Coding'}
		<div class="flex flex-col items-start justify-start gap-4">
			<label class="label">
				<span class="label-text text-base">Add coding info</span>
				<textarea
					class="textarea border-1 border-zinc-600 text-base"
					rows="4"
					bind:value={codingDesc}
					placeholder="Have been coding python for ..."
				></textarea>
			</label>
			{#if notFilled}
				<p class="text-red-500">Fill in all forms</p>
			{/if}
			<button
				class="btn rounded-lg bg-green-700 px-2 py-1"
				disabled={loading}
				onclick={() => addCoding(codingDesc)}>{loading ? 'Adding...' : 'Add'}</button
			>
		</div>
	{:else if chosen_addition === 'Experience'}
		<div class="flex flex-col items-start justify-start gap-4">
			<label class="label">
				<span class="label-text text-base">Add an experience</span>
				<textarea
					class="textarea border-1 border-zinc-600 text-base"
					rows="4"
					bind:value={experiencesDesc}
					placeholder="Summerjob at ..."
				></textarea>
			</label>
			{#if notFilled}
				<p class="text-red-500">Fill in all forms</p>
			{/if}
			<button
				class="btn rounded-lg bg-green-700 px-2 py-1"
				disabled={loading}
				onclick={() => addExperience(experiencesDesc)}>{loading ? 'Adding...' : 'Add'}</button
			>
		</div>
	{:else if chosen_addition === 'Social'}
		<div class="flex flex-col items-start justify-start gap-4">
			<label class="label">
				<span class="label-text text-base">Add Social</span>
				<select class="select border-1 border-zinc-600 px-2 text-base" bind:value={socialsPlatform}>
					<option value="">--Platform--</option>
					<option value="Instagram">Instagram</option>
					<option value="Github">Github</option>
					<option value="Facebook">Facebook</option>
				</select>
				<input
					class="input border-1 border-zinc-600 text-base"
					type="text"
					bind:value={socials_url}
					placeholder="https://www.instagram.com/of_noortekunst/"
				/>
				<input
					class="input border-1 border-zinc-600 text-base"
					type="text"
					bind:value={socialName}
					placeholder="LuComic"
				/>
			</label>
			{#if notFilled}
				<p class="text-red-500">Fill in all forms</p>
			{/if}
			<button
				class="btn rounded-lg bg-green-700 px-2 py-1"
				disabled={loading}
				onclick={() => addSocials(socialsPlatform, socials_url, socialName)}
				>{loading ? 'Adding...' : 'Add'}</button
			>
		</div>
	{/if}
</div>
