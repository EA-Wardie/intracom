import { getContext, setContext } from 'svelte';
import { pb } from '$lib/pb';
import type { User } from '$lib/types';
import { toast } from 'svelte-sonner';

class AuthStore {
	processing = $state<boolean>(false);

	get isLoggedIn(): boolean {
		return pb.authStore.isValid;
	}

	get user(): User | null {
		return pb.authStore.model as User | null;
	}

	async login(username: string, password: string): Promise<void> {
		this.processing = true;

		await pb
			.collection('users')
			.authWithPassword(username, password)
			.then((response) => {
				toast(`Signed in as - ${response.record.username}`);
			})
			.catch((error) => {
				toast(error.message);
			})
			.finally(() => {
				this.processing = false;
			});
	}

	async register(username: string, password: string): Promise<void> {
		this.processing = true;

		return new Promise((resolve, reject) => {
			pb.collection('users')
				.create({
					username: username,
					password: password,
					passwordConfirm: password,
				})
				.then(() => {
					this.login(username, password)
						.then(() => {
							resolve();
						})
						.catch((error) => {
							toast(error.message);
							reject();
						});
				})
				.catch((error) => {
					toast(error.message);
					reject();
				});
		});
	}

	logout(): void {
		pb.authStore.clear();
	}

	async delete(): Promise<void> {
		this.processing = true;

		await pb
			.collection('users')
			.delete(pb.authStore.model?.id)
			.then(() => {
				toast('Account removed');
				this.logout();
			})
			.finally(() => {
				this.processing = false;
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
