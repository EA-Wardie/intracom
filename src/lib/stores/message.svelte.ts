import { getContext, setContext } from 'svelte';
import type { Message } from '$lib/types';
import { pb } from '$lib/pb';

class MessageStore {
	messages = $state<Message[]>([]);

	async fetch(chatId: string) {
		pb.collection('messages')
			.getFullList({ filter: `chat="${chatId}"`, fields: 'text,user,created,expand' })
			.then((messages) => {
				this.messages = messages;
			});
	}

	async create(chatId: string, text: string) {
		await pb.collection('messages').create({
			text: text,
			user: pb.authStore.model?.id,
			chat: chatId,
		});
	}

	async subscribe(chatId: string) {
		await pb.collection('messages').subscribe('*', (event) => {
			if (event.action === 'create' && event.record.chat === chatId) {
				this.messages.push(event.record);
			}
		});
	}

	async unsubscribe() {
		await pb.collection('messages').unsubscribe('*');
	}
}

const STORE_CONTEXT_ID: string = 'store:message';

export const setMessageStoreContext = function (): void {
	setContext(STORE_CONTEXT_ID, new MessageStore());
};

export const getMessageStoreContext = function (): MessageStore {
	return getContext(STORE_CONTEXT_ID);
};
