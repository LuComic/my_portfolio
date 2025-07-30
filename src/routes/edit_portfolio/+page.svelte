<script lang="ts">
	import { Trash, Pencil, Plus } from '@lucide/svelte';
	let { data } = $props();
</script>

<!--First time using a snippet in this project-->
<!--If database gets connected the buttons can get their own modals-->
{#snippet edit_and_delete(project: string)}
	<div class="flex w-full items-center justify-between gap-2 border-b-1 border-zinc-600 py-1">
		<p class="w-full text-zinc-400">{project}</p>
		<div class="flex w-auto items-center justify-center gap-2">
			<button class="btn rounded-lg bg-amber-600 p-1">
				<Pencil size={16} />
			</button>
			<button class="btn rounded-lg bg-red-700 p-1">
				<Trash size={16} />
			</button>
		</div>
	</div>
{/snippet}

<div class="flex h-auto min-h-screen w-screen items-center justify-center">
	<div
		class="flex h-full w-full flex-col items-start justify-start px-4 pt-8 md:w-3/4 md:pt-0 lg:w-1/2 lg:pt-0 xl:w-1/2 xl:pt-0"
	>
		<!--Here the button will add to the database and get its own modal-->
		<div class="flex items-center justify-start gap-4">
			<h1 class="text-xl font-medium">Edit portfolio</h1>
			<button class="btn rounded-lg border-1 border-zinc-600 p-1">
				<Plus size={18} />
			</button>
		</div>
		<hr class="hr my-2 border-zinc-600" />
		<div class="flex w-full flex-col items-start justify-start">
			<div class="my-2 w-full">
				<p class="mb-2 text-lg">Bio</p>
				<div class="flex w-full items-center justify-between gap-2 border-b-1 border-zinc-600 py-1">
					<p class="w-full text-zinc-400">Some text about me</p>
					<button class="btn rounded-lg bg-amber-600 p-1">
						<Pencil size={16} />
					</button>
				</div>
			</div>
			<div class="my-2 w-full">
				<p class="mb-2 text-lg">Coding</p>
				{@render edit_and_delete('Some thing')}
			</div>
			<div class="my-2 w-full">
				<p class="mb-2 text-lg">Projects</p>
				{@render edit_and_delete('Some thing')}
			</div>
			<div class="my-2 w-full">
				<p class="mb-2 text-lg">Experiences</p>
				{@render edit_and_delete('Some thing')}
			</div>
			<div class="my-2 w-full">
				<p class="mb-2 text-lg">Socials</p>
				{@render edit_and_delete('Some thing')}
			</div>
		</div>
		<form method="POST" class="my-8">
			<button type="submit" class="btn rounded-lg bg-red-700 px-2 py-1">Log out</button>
		</form>
	</div>
</div>
