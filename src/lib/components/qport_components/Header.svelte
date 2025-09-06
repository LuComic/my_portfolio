<script lang="ts">
	import { FileUser, FolderOpen, Rabbit } from '@lucide/svelte';
	import { page } from '$app/state';

	let current = $state('');

	// Helper function to check if a path is active
	function isActive(path: string) {
		return page.url.pathname === path || page.url.pathname.startsWith(path + '/');
	}

	$effect(() => {
		if (current) {
			isActive;
		}
	});
</script>

<div class="fixed top-0 left-0 z-20 flex w-full items-center justify-center bg-[#18181b] py-4">
	<div class="flex w-full items-center justify-start gap-2 px-4 pl-2 text-xl md:w-[80vw] md:gap-4">
		<a
			href="/"
			class="btn rounded-lg text-lg font-medium transition visited:text-[#e7e5e4] hover:bg-zinc-950/40 hover:text-lg md:text-xl md:hover:text-xl"
			>Lukas Jääger</a
		>
		<a
			href="/"
			class={`ml-auto flex items-center justify-start gap-2 text-base transition hover:text-violet-400 md:ml-0 ${isActive('/') ? 'text-violet-400' : 'text-[#e7e5e4]'}`}
			onclick={() => (current = 'portfolio')}
		>
			<FileUser size={18} color="currentColor" class="hidden md:inline" />
			Portfolio
		</a>
		<span class="vr h-4 border-slate-500"></span>
		<a
			href="/qport"
			class={`flex items-center justify-start gap-2 text-base transition hover:text-violet-400 ${isActive('/qport') ? 'text-violet-400' : 'text-[#e7e5e4]'}`}
			onclick={() => (current = 'qport')}
		>
			<Rabbit size={18} color="currentColor" class="hidden md:inline" />
			qport
		</a>
		<span class="vr h-4 border-slate-500"></span>
		<a
			href="/blog"
			class={`flex items-center justify-start gap-2 text-base transition hover:text-violet-400 ${isActive('/blog') ? 'text-violet-400' : 'text-[#e7e5e4]'}`}
			onclick={() => (current = 'blog')}
		>
			<FolderOpen size={18} color="currentColor" class="hidden md:inline" />
			blog
		</a>
	</div>
</div>
