<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import MessagesSquare from 'lucide-svelte/icons/messages-square';
	import User from 'lucide-svelte/icons/user';
	import Cog from 'lucide-svelte/icons/cog';
	import { getChatStoreContext } from '$lib/stores/chat.svelte';
	import * as Card from '$lib/components/ui/card';
	import { getAuthStoreContext } from '$lib/stores/auth.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { goto } from '$app/navigation';
	import { toggleMode } from 'mode-watcher';
	import { onDestroy, onMount } from 'svelte';
	import { humanDate } from '$lib/utils';

	const chatStore = getChatStoreContext();
	const authStore = getAuthStoreContext();

	onMount(async () => {
		await chatStore.subscribe();
	});

	let newUsername = $state<string>();

	const attemptAdd = async function() {
		chatStore.create(newUsername || '').then(() => {
			newUsername = '';
		});
	};

	const attemptLogout = function() {
		authStore.logout();
		goto('/login');
	};

	const attemptDelete = async function() {
		await authStore.delete().then(() => {
			goto('/login');
		});
	};

	onDestroy(async () => {
		await chatStore.unsubscribe();
	});
</script>

<section class="w-full h-dvh">
	<Tabs.Root value="chats" class="w-full h-full flex flex-col overflow-y-auto">
		<Tabs.Content value="chats" class="grow m-0">
			<div class="sticky top-0 flex gap-2 p-2 border-b bg-background">
				<Input placeholder="Enter a username..." class="h-9" bind:value={newUsername} />
				<Button size="sm" disabled={!newUsername} onclick={attemptAdd}>Add</Button>
			</div>
			<div class="flex flex-col gap-4 p-4">
				{#each chatStore.chats as chat (chat.id)}
					<Button variant="outline" href="/chat/{chat.id}" class="justify-between">
						<p>@{chat.expand?.users?.find((user) => user.id !== authStore.user?.id)?.username}</p>
						<p class="text-xs text-muted-foreground">{humanDate(chat.created)}</p>
					</Button>
				{/each}
				{#if chatStore.chats.length === 0}
					<Card.Root>
						<Card.Header class="p-2.5 md:p-3.5">
							<Card.Description class="text-center">
								Invite someone to chat with!
							</Card.Description>
						</Card.Header>
					</Card.Root>
				{/if}
			</div>
		</Tabs.Content>
		<Tabs.Content value="account" class="grow m-0">
			<div class="flex flex-col gap-4 p-4">
				<h1 class="text-2xl">@{authStore.user?.username}</h1>
				<AlertDialog.Root>
					<AlertDialog.Trigger class={buttonVariants({variant: 'default', size: 'sm'})}>
						Sign Out
					</AlertDialog.Trigger>
					<AlertDialog.Content>
						<AlertDialog.Header>
							<AlertDialog.Title>Sign out?</AlertDialog.Title>
							<AlertDialog.Description>
								Are you sure you'd like to end your current session? You'll have to sign in again.
							</AlertDialog.Description>
						</AlertDialog.Header>
						<AlertDialog.Footer>
							<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
							<AlertDialog.Action onclick={attemptLogout}>
								Sign Out
							</AlertDialog.Action>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog.Root>
				<AlertDialog.Root>
					<AlertDialog.Trigger class={buttonVariants({variant: 'destructive', size: 'sm'})}>
						Delete Account
					</AlertDialog.Trigger>
					<AlertDialog.Content>
						<AlertDialog.Header>
							<AlertDialog.Title>Delete account?</AlertDialog.Title>
							<AlertDialog.Description>
								Are you sure you'd like to permanently delete your account? This action cannot be
								undone.
							</AlertDialog.Description>
						</AlertDialog.Header>
						<AlertDialog.Footer>
							<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
							<AlertDialog.Action class={buttonVariants({variant: 'destructive'})}
												onclick={attemptDelete}>
								Delete
							</AlertDialog.Action>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog.Root>
			</div>
		</Tabs.Content>
		<Tabs.Content value="settings" class="grow m-0">
			<div class="flex flex-col gap-4 p-4">
				<h1 class="text-2xl">Settings</h1>
				<Button size="sm" onclick={toggleMode}>Toggle Theme</Button>
			</div>
		</Tabs.Content>
		<Tabs.List class="sticky bottom-0 shrink-0 grow-0">
			<Tabs.Trigger value="chats" class="grow gap-2">
				<MessagesSquare class="w-4 h-4" />
				Chats
			</Tabs.Trigger>
			<Tabs.Trigger value="account" class="grow gap-2">
				<User class="w-4 h-4" />
				Account
			</Tabs.Trigger>
			<Tabs.Trigger value="settings" class="grow gap-2">
				<Cog class="w-4 h-4" />
				Settings
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
</section>