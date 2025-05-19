import { client } from '$lib/rpc';
import { createQuery } from '@tanstack/svelte-query';

export default function getCurrent() {
	const query = createQuery({
		queryKey: ['current'],
		queryFn: async () => {
			const response = await client.api.auth.current.$get();

			if (!response.ok) return null;

			const { data } = await response.json();

			return data;
		}
	});

	return query;
}
