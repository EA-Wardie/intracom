import { getContext, setContext } from 'svelte';
import { pb } from '$lib/pb';

class AuthStore {
	username = $state<string>('');
	password = $state<string>('');

	get isLoggedIn() {
		return pb.authStore.isValid;
	}

	get user() {
		return pb.authStore.model;
	}

	async login() {
		await pb.collection('users').authWithPassword(this.username, this.password);
	}

	async register() {
		await pb.collection('users').create({
			username: this.username,
			password: this.password,
			passwordConfirm: this.password,
		});
		await this.login();
	}

	logout() {
		pb.authStore.clear();
	}
}

const STORE_CONTEXT_ID: string = 'store:auth';

export const setAuthStoreContext = function (): void {
	setContext(STORE_CONTEXT_ID, new AuthStore());
};

export const getAuthStoreContext = function (): AuthStore {
	return getContext(STORE_CONTEXT_ID);
};
