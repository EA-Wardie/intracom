import PocketBase, { RecordService } from 'pocketbase';
import type { User, Chat, Message } from '$lib/types';

interface TypedPocketBase extends PocketBase {
	collection(idOrName: 'users'): RecordService<User>;
	collection(idOrName: 'chats'): RecordService<Chat>;
	collection(idOrName: 'messages'): RecordService<Message>;
}

export const pb = new PocketBase('http://127.0.0.1:8090') as TypedPocketBase;
