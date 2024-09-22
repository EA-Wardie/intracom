import type { User, Message } from '$lib/types';

type Expand = {
	users?: User[];
	messages?: Message[];
};

export type Chat = {
	id: string;
	users: string[];
	messages: Message[];
	expand?: Expand;
};
