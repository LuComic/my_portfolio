<script lang="ts">
	import { FileUser, FolderOpen, Rabbit } from '@lucide/svelte';
</script>

<div class="fixed top-0 left-0 z-20 flex w-full items-center justify-center bg-[#18181b] py-4">
	<div
		class="flex w-full items-center justify-start gap-2 px-2 text-xl md:w-[80vw] md:gap-4 md:px-4"
	>
		<a
			href="/"
			class="btn rounded-lg text-lg font-medium transition visited:text-[#e7e5e4] hover:bg-zinc-950/40 hover:text-lg md:text-xl md:hover:text-xl"
			>Lukas Jääger</a
		>
		<a
			href="/"
			class="ml-auto flex items-center justify-start gap-2 text-sm transition hover:text-violet-400 md:ml-0 md:text-base"
		>
			<FileUser size={18} color="currentColor" class="hidden md:inline" />
			Portfolio
		</a>
		<span class="vr h-4 border-slate-500"></span>
		<a
			href="/"
			class="flex items-center justify-start gap-2 text-sm transition hover:text-violet-400 md:text-base"
		>
			<Rabbit size={18} color="currentColor" class="hidden md:inline" />
			qport
		</a>
		<span class="vr h-4 border-slate-500"></span>
		<a
			href="/"
			class="flex items-center justify-start gap-2 text-sm transition hover:text-violet-400 md:text-base"
		>
			<FolderOpen size={18} color="currentColor" class="hidden md:inline" />
			qport updates
		</a>
	</div>
</div>
