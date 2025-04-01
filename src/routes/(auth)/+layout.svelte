<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/state';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: LayoutProps = $props();

	let isSignIn = $derived(page.url.pathname === '/sign-in');
</script>

<main class="bg-neutral-100 min-h-screen">
	<div class="mx-auto max-w-screen-2xl p-4">
		<nav class="flex justify-between items-center">
			<img src="/logo.svg" alt="logo" height={56} width={152} />

			<Button href={isSignIn ? '/sign-up' : '/sign-in'} variant="secondary">
				{isSignIn ? 'Sign Up' : 'Login'}
			</Button>
		</nav>
		<div class="flex flex-col items-center justify-center p-4 md:pt-14">
			{@render children()}
		</div>
	</div>
</main>
