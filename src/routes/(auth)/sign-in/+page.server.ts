import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$features/auth/schemas';

export const load = (async () => {
	const form = await superValidate(zod(loginSchema));
	return { form };
}) satisfies PageServerLoad;
