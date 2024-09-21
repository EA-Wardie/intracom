<script lang="ts">
	import '../../app.css';

	let { children } = $props();
</script>

<main class="w-full h-full min-h-screen flex flex-col justify-center items-center gap-4 md:gap-12 p-4 md:p-12">
	{@render children()}
</main>