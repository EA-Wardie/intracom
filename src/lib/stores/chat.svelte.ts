import { getContext, setContext } from 'svelte';
import { pb } from '$lib/pb';
import type { Chat } from '$lib/types';

class ChatStore {
	chats = $state<Chat[]>([]);

	constructor() {
		$effect(() => {
			pb.collection('users')
				.getOne(pb.authStore.model?.id, { expand: 'chats.users' })
				.then((user) => {
					this.chats = user.expand?.chats || [];
				});
		});
	}

	async create() {}

	async update() {}
}

const STORE_CONTEXT_ID: string = 'store:chat';

export const setChatStoreContext = function (): void {
	setContext(STORE_CONTEXT_ID, new ChatStore());
};

export const getChatStoreContext = function (): ChatStore {
	return getContext(STORE_CONTEXT_ID);
};
