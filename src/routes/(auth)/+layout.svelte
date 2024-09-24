<script lang="ts">
	import '../../app.css';

	let { children } = $props();
</script>

<main class="w-full h-full min-h-dvh flex flex-col justify-center items-center gap-4 p-4">
	{@render children()}
</main>