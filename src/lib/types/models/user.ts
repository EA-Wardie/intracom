import type { Chat } from '$lib/types';

type Expand = {
	chats: Chat[];
};

export type User = {
	id: string;
	username: string;
	expand?: Expand;
};
