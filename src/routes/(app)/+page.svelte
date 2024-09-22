<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import MessagesSquare from 'lucide-svelte/icons/messages-square';
	import User from 'lucide-svelte/icons/user';
	import { getChatStoreContext } from '$lib/stores/chat.svelte';
	import * as Card from '$lib/components/ui/card';
	import { getAuthStoreContext } from '$lib/stores/auth.svelte';
	import { Badge } from '$lib/components/ui/badge';

	const chatStore = getChatStoreContext();
	const authStore = getAuthStoreContext();
</script>

<section class="w-full h-screen">
	<Tabs.Root value="chats" class="w-full h-full flex flex-col">
		<Tabs.Content value="chats" class="grow m-0 p-4 md:p-12">
			<div class="flex flex-col gap-4">
				{#each chatStore.chats as chat (chat.id)}
					<a href="/chat/{chat.id}">
						<Card.Root class="flex flex-row justify-between items-center">
							<Card.Header>
								<Card.Title>
									@{chat.expand?.users.find((user) => user.id !== authStore.user.id)?.username}
								</Card.Title>
								<Card.Description>Your chat with</Card.Description>
							</Card.Header>
							<Badge class="mr-6">{chat.messages.length}
								message{chat.messages.length > 1 ? 's' : ''}</Badge>
						</Card.Root>
					</a>
				{/each}
			</div>
		</Tabs.Content>
		<Tabs.Content value="account" class="grow m-0 p-4 md:p-12">account page</Tabs.Content>
		<Tabs.List class="shrink-0 grow-0">
			<Tabs.Trigger value="chats" class="grow gap-2">
				<MessagesSquare class="w-4 h-4" />
				Chats
			</Tabs.Trigger>
			<Tabs.Trigger value="account" class="grow gap-2">
				<User class="w-4 h-4" />
				Account
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
</section>