<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import MessagesSquare from 'lucide-svelte/icons/messages-square';
	import User from 'lucide-svelte/icons/user';
</script>

<section class="w-full h-screen">
	<Tabs.Root value="chats" class="w-full h-full flex flex-col">
		<Tabs.Content value="chats" class="grow m-0 p-4 md:p-12">
			active chats
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