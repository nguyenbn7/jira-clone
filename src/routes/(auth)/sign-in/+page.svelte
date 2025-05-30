<script lang="ts">
	import type { PageData } from './$types';

	import Loader from '@lucide/svelte/icons/loader';

	import { FaGithub, FcGoogle } from '$lib/components/icons';

	import { loginSchema } from '$features/auth/schema';
	import { createLoginClient } from '$features/auth/api';

	import { Metadata } from '$lib/components/metadata';
	import { DottedSeperator } from '$lib/components/seperator';

	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { FormControl, FormField, FormFieldErrors } from '$lib/components/ui/form';

	import { defaults, superForm } from 'sveltekit-superforms/client';
	import { zod } from 'sveltekit-superforms/adapters';

	interface PageProps {
		data: PageData;
	}

	const { data }: PageProps = $props();

	const loginClient = createLoginClient({
		onSuccess() {
			window.location.reload();
			form.reset(defaults(zod(loginSchema)));
		}
	});

	const form = superForm(defaults(zod(loginSchema)), {
		SPA: true,
		validators: zod(loginSchema),
		resetForm: false,
		onUpdate({ form }) {
			if (form.valid) {
				$loginClient.mutate({ ...form.data });
			}
		}
	});

	const { form: formData, enhance } = form;

	const isPending = $derived($loginClient.isPending);
</script>

<Metadata title="Sign In" />

<Card class="w-full h-full md:w-[487px] border-none shadow-none">
	<CardHeader class="flex items-center justify-center text-center p-7">
		<CardTitle class="text-2xl">Welcome back</CardTitle>
	</CardHeader>

	<div class="px-7">
		<DottedSeperator />
	</div>

	<CardContent class="p-7">
		<form class="space-y-4" method="post" use:enhance>
			<FormField {form} name="email">
				<FormControl>
					{#snippet children({ props })}
						<Input
							{...props}
							type="email"
							disabled={isPending}
							autocomplete="email"
							placeholder="Enter email address"
							bind:value={$formData.email}
						/>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<FormField {form} name="password">
				<FormControl>
					{#snippet children({ props })}
						<Input
							{...props}
							type="password"
							disabled={isPending}
							placeholder="Enter password"
							autocomplete="off"
							bind:value={$formData.password}
						/>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<Button type="submit" disabled={isPending} size="lg" class="w-full">
				Login
				{#if isPending}
					<Loader size={16} class="ml-2 animate-spin text-blue-600" />
				{/if}
			</Button>
		</form>
	</CardContent>

	<div class="px-7">
		<DottedSeperator />
	</div>

	<CardContent class="p-7 flex flex-col gap-y-4">
		<Button variant="secondary" size="lg" disabled={isPending} class="w-full">
			<FcGoogle class="mr-2 size-5" />
			Login with Google
		</Button>

		<Button variant="secondary" size="lg" disabled={isPending} class="w-full">
			<FaGithub class="mr-2 size-5" />
			Login with Github
		</Button>
	</CardContent>

	<div class="px-7">
		<DottedSeperator />
	</div>

	<CardContent class="p-7 flex items-center justify-center">
		<p>
			Don&apos;t have an account?
			<a href="/sign-up" class="hover:underline decoration-blue-700">
				<span class="text-blue-700">&nbsp;Sign up</span>
			</a>
		</p>
	</CardContent>
</Card>
