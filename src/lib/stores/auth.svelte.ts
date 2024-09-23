import { getContext, setContext } from 'svelte';
import { pb } from '$lib/pb';
import type { User } from '$lib/types';

class AuthStore {
	username = $state<string>('');
	password = $state<string>('');

	get isLoggedIn(): boolean {
		return pb.authStore.isValid;
	}

	get user(): User | null {
		return pb.authStore.model as User | null;
	}

	async login(): Promise<void> {
		await pb.collection('users').authWithPassword(this.username, this.password);
	}

	async register(): Promise<void> {
		await pb.collection('users').create({
			username: this.username,
			password: this.password,
			passwordConfirm: this.password,
		});
		await this.login();
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
