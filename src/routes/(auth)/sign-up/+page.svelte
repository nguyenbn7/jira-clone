<script lang="ts">
	import type { PageData } from './$types';

	import Loader from '@lucide/svelte/icons/loader';
	import { FaGithub, FcGoogle } from '$lib/components/icons';

	import { registerSchema } from '$features/auth/schema';
	import { createRegisterClient } from '$features/auth/api';

	import { Metadata } from '$lib/components/metadata';
	import { DottedSeperator } from '$lib/components/seperator';

	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { FormControl, FormField, FormFieldErrors } from '$lib/components/ui/form';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	import { defaults, superForm } from 'sveltekit-superforms/client';
	import { zod } from 'sveltekit-superforms/adapters';

	interface PageProps {
		data: PageData;
	}

	const { data }: PageProps = $props();

	const registerClient = createRegisterClient({
		onSuccess() {
			window.location.reload();
			form.reset(defaults(zod(registerSchema)));
		}
	});

	const form = superForm(defaults(zod(registerSchema)), {
		SPA: true,
		validators: zod(registerSchema),
		resetForm: false,
		onUpdate({ form: _form }) {
			if (_form.valid) {
				$registerClient.mutate({ ..._form.data });
			}
		}
	});

	const { form: formData, enhance } = form;

	const isPending = $derived($registerClient.isPending);
</script>

<Metadata title="Sign Up" />

<Card class="w-full h-full md:w-[487px] border-none shadow-none">
	<CardHeader class="flex items-center justify-center text-center p-7">
		<CardTitle class="text-2xl">Sign up</CardTitle>
		<CardDescription>
			By signing up, you are agree to our{' '}
			<a href="/privacy" class="hover:underline decoration-blue-700">
				<span class="text-blue-700">Privacy Policy</span>
			</a>{' '}
			and{' '}
			<a href="/terms" class="hover:underline decoration-blue-700">
				<span class="text-blue-700">Terms of Service</span>
			</a>
		</CardDescription>
	</CardHeader>

	<div class="px-7">
		<DottedSeperator />
	</div>

	<CardContent class="p-7">
		<form class="space-y-4" method="post" use:enhance>
			<FormField {form} name="name">
				<FormControl>
					{#snippet children({ props })}
						<Input
							{...props}
							type="name"
							disabled={isPending}
							autocomplete="name"
							placeholder="Enter your name"
							bind:value={$formData.name}
						/>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

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
				Register
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
			<FcGoogle class="size-5 mr-2" />
			Login with Google
		</Button>

		<Button variant="secondary" size="lg" disabled={isPending} class="w-full">
			<FaGithub class="size-5 mr-2" />
			Login with Github
		</Button>
	</CardContent>

	<div class="px-7">
		<DottedSeperator />
	</div>

	<CardContent class="p-7 flex items-center justify-center">
		<p>
			Already have an account?
			<a href="/sign-in" class="hover:underline decoration-blue-700">
				<span class="text-blue-700">&nbsp;Sign in</span>
			</a>
		</p>
	</CardContent>
</Card>
