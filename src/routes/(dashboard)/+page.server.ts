import type { PageServerLoad } from './$types';

import { getCurrent } from '$features/auth/server/service';

import { redirect } from '@sveltejs/kit';

export const load = (async ({ cookies }) => {
	const data = await getCurrent(cookies);

	if (!data) redirect(307, '/sign-in');

	return {};
}) satisfies PageServerLoad;
