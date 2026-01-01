<script lang="ts">
	import ProjectModal from '$lib/components/ProjectModal.svelte';
	import { page } from '$app/state';

	const project_id: number = $derived(parseInt(page.params.id));
</script>

<div class="flex h-auto min-h-screen w-screen items-center justify-center">
	<div
		class="flex h-full w-full flex-col items-start justify-start px-4 pt-8 md:w-3/4 md:pt-0 lg:w-1/2 lg:pt-0 xl:w-1/2 xl:pt-0"
	>
		<ProjectModal {project_id} />
	</div>
</div>
