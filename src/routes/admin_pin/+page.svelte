<script lang="ts">
	import '../../app.css';
	let { form } = $props();
</script>

<div class="flex h-auto min-h-screen w-screen items-center justify-center bg-transparent">
	<form
		class="card flex h-auto w-auto flex-col items-center justify-center gap-4 rounded-lg border-1 border-zinc-600 p-4"
		method="POST"
	>
		<p class="w-2/3 text-center text-xl">Enter pin to access admin mode</p>
		<input
			name="admin_pass"
			type="password"
			class="w-2/3 rounded-lg border-1 border-zinc-600 px-2 py-1 text-center"
		/>
		<div class="flex w-full flex-row items-center justify-center gap-2">
			<a href="/" class="btn rounded-lg bg-zinc-600 px-2 py-1 visited:text-[#e7e5e4]">Back</a>
			<button class="btn rounded-lg bg-green-700 px-2 py-1" type="submit">Enter</button>
		</div>
		{#if form?.incorrect}
			<p class="text-red-500">Wrong pin</p>
		{/if}
	</form>
</div>
