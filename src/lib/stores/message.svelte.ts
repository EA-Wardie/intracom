import { getContext, setContext } from 'svelte';
import type { Message } from '$lib/types';
import { pb } from '$lib/pb';

class MessageStore {
	messages = $state<Message[]>([]);

	constructor() {}

	async fetch(id: string) {
		pb.collection('chats')
			.getOne(id, { expand: 'messages' })
			.then((chat) => {
				this.messages = chat.expand?.messages || [];
			});
		// pb.collection('messages')
		// 	.getFullList()
		// 	.then((messages) => {
		// 		this.messages = messages;
		// 	});
	}

	async create() {}
}

const STORE_CONTEXT_ID: string = 'store:message';

export const setMessageStoreContext = function (): void {
	setContext(STORE_CONTEXT_ID, new MessageStore());
};

export const getMessageStoreContext = function (): MessageStore {
	return getContext(STORE_CONTEXT_ID);
};
