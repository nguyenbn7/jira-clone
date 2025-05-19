import type { Cookies } from '@sveltejs/kit';

import { AUTH_COOKIE } from '$features/auth/constant';

import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';

import { Account, Client } from 'node-appwrite';

export async function getCurrent(cookies: Cookies) {
	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT);

	const session = cookies.get(AUTH_COOKIE);

	if (!session) return;

	try {
		client.setSession(session);

		const account = new Account(client);

		return account.get();
	} catch {
		return;
	}
}
