<script lang="ts">
	import type { PageData } from './$types';
	import { getMessageStoreContext } from '$lib/stores/message.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { initials } from '$lib/utils.js';
	import { getAuthStoreContext } from '$lib/stores/auth.svelte';
	import type { Chat, User } from '$lib/types';
	import { getChatStoreContext } from '$lib/stores/chat.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { onDestroy, onMount } from 'svelte';

	let { data } = $props<{ data: PageData }>();

	const chatStore = getChatStoreContext();
	const messageStore = getMessageStoreContext();
	const authStore = getAuthStoreContext();

	onMount(async () => {
		await messageStore.fetch(data.id);
		await messageStore.subscribe();
	});

	const currentChat = function(): Chat | undefined {
		return chatStore.chats.find((chat) => chat.id === data.id);
	};

	const isMe = function(user?: User): boolean {
		return authStore.user?.id === user?.id;
	};

	let newMessage = $state<string>('');

	const attemptSend = function() {
		messageStore.create(data.id, newMessage).then(() => {
			newMessage = '';
		});
	};

	onDestroy(async () => {
		await messageStore.unsubscribe();
	});
</script>

<section class="h-full min-h-screen flex flex-col">
	<div class="sticky top-0 flex gap-2 border-b p-4">
		{#each (currentChat()?.expand?.users || []) as user (user.id)}
			<Badge>{user.username}</Badge>
		{/each}
	</div>
	<div class="grow flex flex-col gap-4 p-4 md:p-12">
		{#each messageStore.messages as message (message.id)}
			<div class="flex {isMe(message.expand?.user) ? 'flex-row-reverse' : ''} gap-2">
				<Card.Root
					class="w-10 md:w-14 h-10 md:h-14 flex justify-center items-center {isMe(message.expand?.user) ? 'bg-primary text-primary-foreground' : ''} text-lg md:text-2xl">
					{initials(message.expand?.user.username || '')}
				</Card.Root>
				<Card.Root
					class="w-4/5 md:w-2/3 {isMe(message.expand?.user) ? 'bg-primary text-primary-foreground' : ''} max-md:text-xs p-2.5 md:p-3.5">
					{message.text}
				</Card.Root>
			</div>
		{/each}
		{#if messageStore.messages.length === 0}
			<Card.Root>
				<Card.Header class="p-4">
					<Card.Description class="text-center">
						Be the first to send a message!
					</Card.Description>
				</Card.Header>
			</Card.Root>
		{/if}
	</div>
	<Separator />
	<div class="sticky bottom-0 shrink-0 grow-0 flex gap-4 p-4">
		<Input placeholder="Enter your message..." bind:value={newMessage} />
		<Button disabled={!newMessage} onclick={attemptSend}>Send</Button>
	</div>
</section>