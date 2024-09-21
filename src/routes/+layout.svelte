<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { setAuthStoreContext } from '$lib/stores/auth.svelte';

	let { children } = $props();

	setAuthStoreContext();
</script>

<svelte:head>
	<title>{$page.data.title} | FindCode</title>
</svelte:head>

<ModeWatcher />

{@render children()}
