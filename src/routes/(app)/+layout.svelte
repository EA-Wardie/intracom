<script lang="ts">
	import '../../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { getAuthStoreContext } from '$lib/stores/auth.svelte';
	import { goto } from '$app/navigation';

	let { children } = $props();

	const authStore = getAuthStoreContext();

	$effect(() => {
		if (!authStore.isLoggedIn) {
			goto('/login');
		}
	});
</script>

<ModeWatcher />

<main class="w-full h-full min-h-screen">
	{@render children()}
</main>