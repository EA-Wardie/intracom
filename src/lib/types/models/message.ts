import type { Chat, User } from '$lib/types';

type Expand = {
	user: User;
	chat: Chat;
};

export type Message = {
	id: string;
	text: string;
	user: string;
	chat: string;
	created: string;
	updated: string;
	expand?: Expand;
};
