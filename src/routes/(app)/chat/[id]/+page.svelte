<script lang="ts">
	import type { PageData } from './$types';
	import { getMessageStoreContext } from '$lib/stores/message.svelte';
	import * as Card from '$lib/components/ui/card';

	let { data } = $props<{ data: PageData }>();

	const messageStore = getMessageStoreContext();

	$effect(() => {
		messageStore.fetch(data.id);
	});
</script>

<section class="h-full min-h-screen flex flex-col">
	<div class="grow flex flex-col gap-4 p-4 md:p-12">
		{#each messageStore.messages as message (message.id)}
			<Card.Root class="max-w-[75%] p-3">
				{message.text}
			</Card.Root>
		{/each}
	</div>
	<div class="sticky bottom-0 shrink-0 grow-0">input</div>
</section>