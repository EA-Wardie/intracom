import { getContext, setContext } from 'svelte';
import { pb } from '$lib/pb';
import type { User } from '$lib/types';

class AuthStore {
	get isLoggedIn(): boolean {
		return pb.authStore.isValid;
	}

	get user(): User | null {
		return pb.authStore.model as User | null;
	}

	async login(username: string, password: string): Promise<void> {
		await pb.collection('users').authWithPassword(username, password);
	}

	async register(username: string, password: string): Promise<void> {
		await pb.collection('users').create({
			username: username,
			password: password,
			passwordConfirm: password,
		});
		await this.login(username, password);
	}

	logout(): void {
		pb.authStore.clear();
	}

	async delete(): Promise<void> {
		await pb
			.collection('users')
			.delete(pb.authStore.model?.id)
			.then(() => {
				this.logout();
			});
	}
}

const STORE_CONTEXT_ID: string = 'store:auth';

export const setAuthStoreContext = function (): void {
	setContext(STORE_CONTEXT_ID, new AuthStore());
};

export const getAuthStoreContext = function (): AuthStore {
	return getContext(STORE_CONTEXT_ID);
};
