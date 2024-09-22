<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { setAuthStoreContext } from '$lib/stores/auth.svelte';
	import { setChatStoreContext } from '$lib/stores/chat.svelte';
	import { setMessageStoreContext } from '$lib/stores/message.svelte';

	let { children } = $props();

	setAuthStoreContext();
	setChatStoreContext();
	setMessageStoreContext();
</script>

<svelte:head>
	<title>{$page.data.title} | FindCode</title>
</svelte:head>

<ModeWatcher />

{@render children()}
