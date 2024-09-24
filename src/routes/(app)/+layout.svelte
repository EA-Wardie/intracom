<script lang="ts">
	import '../../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { getAuthStoreContext } from '$lib/stores/auth.svelte';
	import { goto } from '$app/navigation';
	import { setChatStoreContext } from '$lib/stores/chat.svelte';
	import { setMessageStoreContext } from '$lib/stores/message.svelte';

	let { children } = $props();

	setChatStoreContext();
	setMessageStoreContext();

	const authStore = getAuthStoreContext();

	$effect(() => {
		if (!authStore.isLoggedIn) {
			goto('/login');
		}
	});
</script>

<ModeWatcher />

<main class="w-full h-full min-h-dvh">
	{@render children()}
</main>