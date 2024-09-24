<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { setAuthStoreContext } from '$lib/stores/auth.svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	let { children } = $props();

	setAuthStoreContext();
</script>

<svelte:head>
	<title>{$page.data.title} | Intracom</title>
</svelte:head>

<ModeWatcher />
<Toaster />

{@render children()}
