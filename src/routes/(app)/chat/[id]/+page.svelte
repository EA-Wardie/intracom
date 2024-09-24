<script lang="ts">
	import type { PageData } from './$types';
	import { getMessageStoreContext } from '$lib/stores/message.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { getAuthStoreContext } from '$lib/stores/auth.svelte';
	import type { Chat, User } from '$lib/types';
	import { getChatStoreContext } from '$lib/stores/chat.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { onDestroy, onMount } from 'svelte';
	import { humanDate } from '$lib/utils';
	import SendHorizontal from 'lucide-svelte/icons/send-horizontal';

	let { data } = $props<{ data: PageData }>();

	const chatStore = getChatStoreContext();
	const messageStore = getMessageStoreContext();
	const authStore = getAuthStoreContext();

	onMount(async () => {
		await messageStore.fetch(data.id);
		await messageStore.subscribe(data.id);
	});

	const currentChat = function(): Chat | undefined {
		return chatStore.chats.find((chat) => chat.id === data.id);
	};

	const invitee = function(): User | undefined {
		return currentChat()?.expand?.users?.find((user) => user.id !== authStore.user?.id);
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
	<div class="sticky top-0 flex justify-between items-center border-b pl-1 pr-2 py-1">
		<Button size="sm" variant="ghost" onclick={() => history.back()}>Back</Button>
		<Badge>@{invitee()?.username}</Badge>
	</div>
	<div class="grow flex flex-col gap-4 p-4">
		{#each messageStore.messages as message}
			<div class="flex {message.user === authStore.user?.id ? 'flex-row-reverse' : ''} gap-2">
				<Card.Root
					class="w-4/5 md:w-2/3 flex flex-col gap-1 {message.user === authStore.user?.id ? 'bg-primary text-primary-foreground' : ''} max-md:text-xs p-2 md:p-4">
					<p>{message.text}</p>
					<p class="text-[9px] leading-none text-end opacity-50">{humanDate(message.created)}</p>
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
		<Input placeholder="Enter your message..." class="h-9" bind:value={newMessage} />
		<Button size="sm" disabled={!newMessage} onclick={attemptSend}>
			<SendHorizontal class="w-4 h-4" />
		</Button>
	</div>
</section>