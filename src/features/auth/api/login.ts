import type { InferRequestType, InferResponseType } from 'hono';
import { client } from '$lib/rpc';
import { createMutation } from '@tanstack/svelte-query';

type Response = InferResponseType<(typeof client.api.auth.login)['$post']>;
type Request = InferRequestType<(typeof client.api.auth.login)['$post']>['json'];

interface Options {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (error: Error, variables: Request, context: unknown) => Promise<unknown> | unknown;
}

export default function login(options: Options = {}) {
	const { onError, onSuccess } = options;

	const mutation = createMutation<Response, Error, Request>({
		mutationFn: async (json) => {
			const response = await client.api.auth.login['$post']({ json });
			return response.json();
		},
		onError,
		onSuccess
	});

	return mutation;
}
