import type { LayoutServerLoad } from './$types';

import { getCurrent } from '$features/auth/server/service';

import { redirect } from '@sveltejs/kit';

export const load = (async ({ cookies }) => {
	const data = await getCurrent(cookies);

	if (data) redirect(308, '/');

	return {};
}) satisfies LayoutServerLoad;
