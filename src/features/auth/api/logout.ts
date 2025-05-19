import type { InferResponseType } from 'hono';
import { client } from '$lib/rpc';
import { createMutation, useQueryClient } from '@tanstack/svelte-query';

type Response = InferResponseType<(typeof client.api.auth.logout)['$post']>;

export default function logout() {
	const queryClient = useQueryClient();

	const mutation = createMutation<Response, Error>({
		mutationFn: async () => {
			const response = await client.api.auth.logout['$post']();
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['current'] });
			window.location.reload();
		}
	});

	return mutation;
}
