import type { User, Message } from '$lib/types';

type Expand = {
	users?: User[];
};

export type Chat = {
	id: string;
	users: string[];
	messages: Message[];
	expand?: Expand;
};
