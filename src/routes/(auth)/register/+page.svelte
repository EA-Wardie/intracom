<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card';
	import { getAuthStoreContext } from '$lib/stores/auth.svelte';

	const authStore = getAuthStoreContext();

	const attemptRegister = function() {
		authStore.register().then(() => {
			history.back();
		});
	};
</script>

<section class="w-full max-w-md">
	<Card.Root>
		<form onsubmit={attemptRegister}>
			<Card.Header>
				<Card.Title>Sign up for an account</Card.Title>
				<Card.Description>Use the form below to sign up.</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col gap-6">
				<Label class="flex flex-col gap-1">
					Username
					<Input required placeholder="Enter a username" bind:value={authStore.username} />
					<p class="text-xs text-muted-foreground text-end">usernames are public</p>
				</Label>
				<Label class="flex flex-col gap-1">
					Password
					<Input required type="password" placeholder="Enter a password" minlength={8}
						   bind:value={authStore.password} />
				</Label>
			</Card.Content>
			<Card.Footer class="flex flex-col gap-4">
				<Button class="w-full gap-2" type="submit">
					Sign Up
					<ArrowRight class="w-4 h-4" />
				</Button>
				<Button data-sveltekit-replacestate variant="link" href="/login" class="w-full">
					Already signed up? Sign in instead!
				</Button>
			</Card.Footer>
		</form>
	</Card.Root>
</section>