<script lang="ts">
	import type {
		project_type,
		coding_type,
		social_type,
		experiences_type,
		footer_type,
		personal_type
	} from '$lib/types';
	const {
		goBackToTheModernDay,
		personal,
		coding,
		experiences,
		socials,
		footer,
		projects
	}: {
		goBackToTheModernDay: () => void;
		personal: personal_type[];
		coding: coding_type[];
		experiences: experiences_type[];
		socials: social_type[];
		footer: footer_type[];
		projects: project_type[];
	} = $props();
	import BioModal from './BioModal.svelte';
	import CodingModal from './CodingModal.svelte';
	import ExperiencesModal from './ExperiencesModal.svelte';
	import SocialsModal from './SocialsModal.svelte';
	import MoreInformationModal from './MoreInformationModal.svelte';
	import WinProjectsModal from './WinProjectsModal.svelte';
	import { onMount, onDestroy } from 'svelte';

	let bioOpen = $state(false);
	let codingOpen = $state(false);
	let experiencesOpen = $state(false);
	let socialsOpen = $state(false);
	let informationOpen = $state(false);
	let projectsOpen = $state(false);

	// Track modal order for stacking
	let modalOrder = $state<string[]>([]);

	// Function to bring a modal to the front
	const bringModalToFront = (modalName: string) => {
		modalOrder = modalOrder.filter((modal) => modal !== modalName);
		modalOrder = [...modalOrder, modalName];
	};

	const closeBio = () => {
		bioOpen = false;
		modalOrder = modalOrder.filter((modal) => modal !== 'bio');
	};
	const closeCoding = () => {
		codingOpen = false;
		modalOrder = modalOrder.filter((modal) => modal !== 'coding');
	};
	const closeExperiences = () => {
		experiencesOpen = false;
		modalOrder = modalOrder.filter((modal) => modal !== 'experiences');
	};
	const closeSocials = () => {
		socialsOpen = false;
		modalOrder = modalOrder.filter((modal) => modal !== 'socials');
	};
	const closeFooter = () => {
		informationOpen = false;
		modalOrder = modalOrder.filter((modal) => modal !== 'information');
	};
	const closeProjects = () => {
		projectsOpen = false;
		modalOrder = modalOrder.filter((modal) => modal !== 'projects');
	};

	// Prevent scrolling when Windows page is mounted
	onMount(() => {
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';
	});

	// Restore scrolling when component is destroyed
	onDestroy(() => {
		document.body.style.overflow = '';
		document.documentElement.style.overflow = '';
	});
</script>

<div class="flex h-screen w-full items-start justify-start gap-4 bg-black select-none">
	{#if bioOpen}
		<BioModal {closeBio} {personal} {modalOrder} {bringModalToFront} />
	{/if}
	{#if codingOpen}
		<CodingModal {closeCoding} {coding} {modalOrder} {bringModalToFront} />
	{/if}
	{#if experiencesOpen}
		<ExperiencesModal {closeExperiences} {experiences} {modalOrder} {bringModalToFront} />
	{/if}
	{#if socialsOpen}
		<SocialsModal {closeSocials} {socials} {modalOrder} {bringModalToFront} />
	{/if}
	{#if informationOpen}
		<MoreInformationModal {closeFooter} {footer} {modalOrder} {bringModalToFront} />
	{/if}
	{#if projectsOpen}
		<WinProjectsModal {closeProjects} {projects} {modalOrder} {bringModalToFront} />
	{/if}
	<img
		class="pointer-events-none absolute top-0 h-full w-full object-cover select-none"
		src="pictures/windows_background.webp"
		alt="windows bg"
	/>
	<div class="z-30 flex h-20 items-start justify-center gap-2 p-2">
		<button
			class="flex flex-col hover:bg-black/20"
			onclick={() => {
				bringModalToFront('bio');
				bioOpen = true;
			}}
		>
			{#if bioOpen}
				<img src="pictures/windows_open_folder.png" alt="folder" class="h-auto w-[100px]" />
			{:else}
				<img src="pictures/windows_folder.png" alt="folder" class="h-auto w-[100px]" />
			{/if}
			<p>Bio</p>
		</button>
		<button
			class="flex flex-col hover:bg-black/20"
			onclick={() => {
				bringModalToFront('information');
				informationOpen = true;
			}}
		>
			{#if informationOpen}
				<img src="pictures/windows_open_folder.png" alt="folder" class="h-auto w-[100px]" />
			{:else}
				<img src="pictures/windows_folder.png" alt="folder" class="h-auto w-[100px]" />
			{/if}
			<p>More <br /> information</p>
		</button>
	</div>
	<div
		class="absolute bottom-0 left-0 z-20 flex h-12 w-full items-center justify-start gap-1 bg-[#245DDB] p-1"
	>
		<button
			class="flex h-full w-auto items-center justify-start rounded-lg border-t-4 border-t-[#71c171] bg-[#459D45] px-2 hover:bg-[#478b47]"
			onclick={goBackToTheModernDay}
		>
			<p>Back to modern</p>
		</button>
		<button
			class={`flex h-full w-auto items-center justify-start rounded-lg border-t-4 border-t-[#96beed] py-1 pr-40 hover:bg-[#4f78f2] ${codingOpen ? 'bg-[#4f78f2]' : 'bg-[#4F9AF2]'}`}
			onclick={() => {
				bringModalToFront('coding');
				codingOpen = true;
			}}
		>
			<img src="pictures/windows_coding.png" alt="coding" class="h-auto w-[60px]" />
			<p>Coding</p>
		</button>
		<button
			class={`flex h-full w-auto items-center justify-start rounded-lg border-t-4 border-t-[#96beed] py-1 pr-40 hover:bg-[#4f78f2] ${projectsOpen ? 'bg-[#4f78f2]' : 'bg-[#4F9AF2]'}`}
			onclick={() => {
				bringModalToFront('projects');
				projectsOpen = true;
			}}
		>
			<img src="pictures/windows_projects.png" alt="coding" class="h-auto w-[60px]" />
			<p>Projects</p>
		</button>
		<button
			class={`flex h-full w-auto items-center justify-start rounded-lg border-t-4 border-t-[#96beed] py-1 pr-40 hover:bg-[#4f78f2] ${experiencesOpen ? 'bg-[#4f78f2]' : 'bg-[#4F9AF2]'}`}
			onclick={() => {
				bringModalToFront('experiences');
				experiencesOpen = true;
			}}
		>
			<img src="pictures/windows_experiences.png" alt="coding" class="h-auto w-[60px]" />
			<p>Experiences</p>
		</button>
		<button
			class={`flex h-full w-auto items-center justify-start rounded-lg border-t-4 border-t-[#96beed] py-1 pr-40 hover:bg-[#4f78f2] ${socialsOpen ? 'bg-[#4f78f2]' : 'bg-[#4F9AF2]'}`}
			onclick={() => {
				bringModalToFront('socials');
				socialsOpen = true;
			}}
		>
			<img src="pictures/windows_info.png" alt="coding" class="h-auto w-[60px]" />
			<p>Socials</p>
		</button>
	</div>
</div>
