import { getContext, setContext } from 'svelte';
import { pb } from '$lib/pb';
import type { Chat } from '$lib/types';

class ChatStore {
	chats = $state<Chat[]>([]);

	constructor() {
		pb.collection('chats')
			.getFullList({ filter: `users~"${pb.authStore.model?.id}"`, expand: 'users', fields: 'id,created,expand' })
			.then((chats) => {
				this.chats = chats;
			});
	}

	async create(username: string): Promise<void> {
		return new Promise((resolve, reject) => {
			pb.collection('users')
				.getFirstListItem(`username="${username}"`, { fields: 'id' })
				.then((user) => {
					pb.collection('chats')
						.create(
							{
								users: [pb.authStore.model?.id, user.id],
							},
							{ expand: 'users' },
						)
						.then(() => resolve())
						.catch(() => reject());
				})
				.catch(() => reject());
		});
	}

	async subscribe() {
		await pb.collection('chats').subscribe(
			'*',
			(event) => {
				if (event.action === 'create' && event.record.users.includes(pb.authStore.model?.id)) {
					this.chats.push(event.record);
				}
			},
			{ expand: 'users' },
		);
	}

	async unsubscribe() {
		await pb.collection('chats').unsubscribe('*');
	}
}

const STORE_CONTEXT_ID: string = 'store:chat';

export const setChatStoreContext = function (): void {
	setContext(STORE_CONTEXT_ID, new ChatStore());
};

export const getChatStoreContext = function (): ChatStore {
	return getContext(STORE_CONTEXT_ID);
};
